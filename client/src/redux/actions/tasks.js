import { createAction } from 'redux-act';

export const setTasksAction = createAction('SET_TASKS_ACTION');
export const getTasksAction = createAction('GET_TASKS_ACTION');
export const createTaskAction = createAction('CREATE_TASK_ACTION');
export const addTaskAction = createAction('ADD_TASK_ACTION');

export const createProjectAction = createAction('CREATE_PROJECT_ACTION');
export const addCreatedProjectAction = createAction('ADD_CREATED_PROJECT_ACTION');
export const getProjectsAction = createAction('GET_PROJECTS_ACTION');
export const setProjectsAction = createAction('SET_PROJECTS_ACTION');

export const setCurrentProjectAction = createAction('SET_CURRENT_PROJECT_ACTION');

export const deleteTaskAction = createAction('DELETE_TASKS_ACTION');
export const deleteProjectAction = createAction('DELETE_PROJECT_ACTION');
