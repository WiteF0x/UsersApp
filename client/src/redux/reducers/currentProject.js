import { createReducer } from 'redux-act';

import { setCurrentProjectAction } from '../actions/tasks';

const initialState = {
  current: {},
};

export default createReducer({
  [setCurrentProjectAction]: (state, current) => ({
    ...state,
    current,
  }),
}, initialState);
