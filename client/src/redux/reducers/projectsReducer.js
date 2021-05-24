import { createReducer } from 'redux-act';

import { setProjectsAction, addCreatedProjectAction } from '../actions/tasks';

const initialState = {
  projects: [],
};

export default createReducer({
  [setProjectsAction]: (state, projects) => ({
    ...state,
    projects,
  }),
  [addCreatedProjectAction]: (state, project) => ({
    projects: [...state.projects, project],
  }),
}, initialState);
