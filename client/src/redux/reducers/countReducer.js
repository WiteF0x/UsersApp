import { createReducer } from 'redux-act';

import { setCountAction } from '../actions/types';

const initialState = {
  count: null,
};

export default createReducer({
  [setCountAction]: (state, data) => ({
    ...state,
    count: data,
  })
}, initialState)