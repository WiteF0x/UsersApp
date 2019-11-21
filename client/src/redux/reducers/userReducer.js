import { createReducer } from 'redux-act';

import { saveUserData } from '../actions/users';

const initialState = {
  user: null,
};

export default createReducer({
  [saveUserData]: (state, data) => ({
    ...state,
    user: data,
  }),
}, initialState);