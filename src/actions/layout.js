import { createAction } from 'redux-actions';

export const createContainer = createAction(
  'GRID:CREATE_CONTAINER',
  ({ parentFlexBoxPath, data }) => ({ parentFlexBoxPath, data }),
);

export const removeContainer = createAction(
  'GRID:REMOVE_CONTAINER',
  flexBoxPath => ({
    flexBoxPath,
  }),
);

export const moveContainer = createAction(
  'GRID:MOVE_CONTAINER',
  ({ from, to }) => ({
    from,
    to,
  }),
);

export const changeSize = createAction(
  'GRID:CHANGE_SIZE',
  ({ flexBoxPath, size }) => ({ flexBoxPath, size }),
);

export const setData = createAction(
  'GRID:SET_DATA',
  ({ flexBoxPath, data }) => ({ flexBoxPath, data }),
);
