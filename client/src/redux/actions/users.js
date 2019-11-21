import { createAction } from 'redux-act';

export const saveUserData = createAction('SAVE_USER_DATA');
export const getProfileInfoAction = createAction('GET_PROFILE_INFO_ACTION');
export const removeUserTypeAction = createAction('REMOVE_USER_TYPE_ACTION');
export const patchUserAction = createAction('PATH_USER_ACTION');
export const getUsersListAction = createAction('GET_USERS_LIST_ACTION');
export const saveUsersListAction = createAction('SAVE_USERS_LIST_ACTION');
export const deleteUserAction = createAction('DELETE_USER_ACTION');
export const addTypeToUserAction = createAction('ADD_TYPE_TO_USER_ACTION');
export const getMyProfileAction = createAction('GET_MY_PROFILE_ACTION');