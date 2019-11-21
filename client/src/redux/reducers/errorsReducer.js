import { createReducer } from 'redux-act';

import { pushError } from '../actions/error';

const initialState = {
  error: '',
};

export default createReducer({
  [pushError]: (state, data) => ({
    ...state,
    error: data,
  }),
}, initialState);