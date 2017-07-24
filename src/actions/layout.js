import { createAction } from 'redux-actions';

export const createContainer = ({ flexBoxId, parentFlexBoxPath }) =>
  createAction('GRID:CREATE_CONTAINER', { flexBoxId, parentFlexBoxPath });

export const removeContainer = flexBoxPath =>
  createAction('GRID:REMOVE_CONTAINER', { flexBoxPath });

export const moveContainer = ({ flexBoxId, from, to }) =>
  createAction('GRID:MOVE_CONTAINER', { flexBoxId, from, to });
