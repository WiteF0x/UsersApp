import { createReducer } from 'redux-act';

import { saveUsersListAction } from '../actions/users';

const initialState = {
  usersList: [],
};

export default createReducer({
  [saveUsersListAction]: (state, data) => ({
    ...state,
    usersList: data,
  }),
}, initialState)