import { handleActions } from 'redux-actions';
import * as actions from '../actions/layout';

import {
  createNewContainer,
  getRootState,
  deSerializePayloadToState,
} from './layoutUtils';

const reducer = handleActions(
  {
    [actions.initLayoutFromPayload]: (state, { payload }) =>
      deSerializePayloadToState(payload),

    [actions.createContainer]: (state, { payload }) =>
      state.updateIn([...payload.parentFlexBoxPath, 'children'], children =>
        children.push(createNewContainer(payload.data)),
      ),

    [actions.removeContainer]: (state, { payload }) =>
      state.deleteIn([...payload.flexBoxPath]),

    [actions.changeSize]: (state, { payload }) =>
      state.setIn([...payload.flexBoxPath, 'size'], payload.size),

    [actions.setData]: (state, { payload }) =>
      state.setIn([...payload.flexBoxPath, 'data'], payload.data),

    [actions.moveContainer]: (state, { payload }) => {
      const container = state.getIn([...payload.from]);
      const targetContainer = state.getIn([...payload.to]);

      const isTargetContainsData = targetContainer.get('data');

      let nextState = state;

      if (isTargetContainsData) {
        nextState = nextState
          .setIn([...payload.to, 'data'], null)
          .updateIn([...payload.to, 'children'], children =>
            children.push(targetContainer),
          );
      }

      nextState = nextState
        .updateIn([...payload.to, 'children'], children =>
          children.push(container),
        )
        .deleteIn([...payload.from]);

      const isCellEmpty =
        !nextState.getIn([...payload.from.slice(0, -1)]).size &&
        !nextState.getIn([...payload.from.slice(0, -2), 'data']);

      if (isCellEmpty) {
        nextState = nextState.deleteIn([...payload.from.slice(0, -2)]);
      }

      return nextState;
    },
  },
  getRootState(),
);

export default reducer;
