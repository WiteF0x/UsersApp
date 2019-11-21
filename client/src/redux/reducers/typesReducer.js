import { createReducer } from 'redux-act';

import { setTypessAction } from '../actions/types';

const initialState = {
  types: [],
};

export default createReducer({
  [setTypessAction]: (state, data) => ({
    ...state,
    types: data,
  })
}, initialState)