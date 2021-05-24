import { createReducer } from 'redux-act';

import { setTasksAction, addTaskAction } from '../actions/tasks';

const initialState = {
  tasks: [],
};

export default createReducer({
  [setTasksAction]: (state, tasks) => ({
    ...state,
    tasks,
  }),
  [addTaskAction]: (state, task) => ({
    tasks: [...state.tasks, task]
  }),
}, initialState);
