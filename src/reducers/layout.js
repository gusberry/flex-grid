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
      const parentContainerPath = payload.from.slice(0, -2);

      let nextState = state.deleteIn([...payload.from]);

      if (state.getIn([...parentContainerPath, 'children']).length === 1) {
        nextState = nextState.setIn(
          [...parentContainerPath],
          nextState.getIn([...parentContainerPath, 'children', 0]),
        );
      }

      if (!targetContainer.get('data')) {
        return nextState.setIn([...payload.to], container);
      }

      return nextState
        .setIn([...payload.to, 'data'], null)
        .updateIn([...payload.to, 'children'], children =>
          children.push(targetContainer).push(container),
        );
    },
  },
  getRootState(),
);

export default reducer;
