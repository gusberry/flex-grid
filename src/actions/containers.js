import { createAction } from 'redux-actions';

export const changeSize = ({ flexBoxId, size }) =>
  createAction('GRID:CHANGE_SIZE', { flexBoxId, size });

export const setData = data => createAction('GRID:SET_DATA', data);
