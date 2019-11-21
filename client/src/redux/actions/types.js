import { createAction } from 'redux-act';

export const getCountAction = createAction('GET_COUNT_ACTION');
export const setCountAction = createAction('SET_COUNT_ACTION');
export const getTypesAction = createAction('GET_TYPES_ACTION');
export const setTypessAction = createAction('SET_TYPES_ACTION');
export const getFilterCountAction = createAction('GET_FILTER_COUNT_ACTION');

export const updateTypeAction = createAction('UPDATE_TYPE_ACTION');
export const createTypeAction = createAction('CREATE_TYPE_ACTION');
export const deleteTypeAction = createAction('DELETE_TYPE_ACTION');