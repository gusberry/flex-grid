import im from 'immutable';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/layout';

const createNewContainer = id =>
  im.fromJS({
    id,
    children: [],
  });

const reducer = handleActions(
  {
    [actions.createContainer]: (state, { payload }) =>
      state.mergeIn(
        [...payload.parentFlexBoxPath, 'children'],
        createNewContainer(payload.flexBoxId),
      ),

    [actions.removeContainer]: (state, { payload }) =>
      state.deleteIn([...payload.flexBoxPath]),

    [actions.moveContainer]: (state, { payload }) => {
      const container = state.getIn([...payload.from]);

      return state
        .deleteIn([...payload.from])
        .setIn([...payload.to], container);
    },
  },
  im.Map(),
);

export default (state = 'layout') => state;
