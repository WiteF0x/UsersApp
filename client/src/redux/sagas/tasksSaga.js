import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../utils/axios';

import { getTasksAction, setTasksAction, getProjectsAction, setProjectsAction, createProjectAction, addCreatedProjectAction, createTaskAction, addTaskAction, deleteTaskAction, deleteProjectAction } from '../actions/tasks'

const config = (token) => {
  return {
    headers: {
      'auth-token': token
    }
  }
};

function* getTasks({ payload }) {
  try {
    const { project } = payload;
    const token = JSON.parse(localStorage.getItem('token'));
    const { data: tasks } = yield call(api.post, '/tasks/getTasks', { project }, config(token));
    yield put(setTasksAction(tasks));
  } catch (e) {
    console.log(e);
  }
};

function* getProjects() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { data: projects } = yield call(api.get, '/projects', config(token));
    yield put(setProjectsAction(projects));
  } catch (e) {
    console.log(e);
  }
};

function* createProject({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { data: project } = yield call(api.post, '/projects', payload, config(token));
    yield put(addCreatedProjectAction(project))
  } catch (e) {
    console.log(e);
  }
};

function* createTask({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { data: task } = yield call(api.post, '/tasks', payload, config(token));
    yield put(addTaskAction(task));
  } catch (e) {
    console.log(e);
  }
};

function* deleteTask({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    yield call(api.post, '/tasks/delete', payload, config(token));
  } catch (e) {
    console.log(e)
  }
};

function* deleteProject({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    yield call(api.post, '/projects/delete', payload, config(token));
  } catch (e) {
    console.log(e);
  }
}

export default function* typesSaga() {
  yield all([
    takeLatest(getTasksAction, getTasks),
    takeLatest(getProjectsAction, getProjects),
    takeLatest(createProjectAction, createProject),
    takeLatest(createTaskAction, createTask),
    takeLatest(deleteTaskAction, deleteTask),
    takeLatest(deleteProjectAction, deleteProject),
  ]);
};
