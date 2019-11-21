import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../utils/axios';
import {
  getCountAction,
  setCountAction,
  getTypesAction,
  setTypessAction,
  getFilterCountAction,
  updateTypeAction,
  createTypeAction,
  deleteTypeAction,
} from '../actions/types';
import { saveUsersListAction, saveUserData } from '../actions/users';

const config = (token) => {
  return {
    headers: {
      'auth-token': token
    }
  }
};

function* getCout() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const count = yield call(api.get, '/users/countUsers', config(token));
    yield put(setCountAction(count.data));
  } catch (error) {
    console.log('GEt COUNT ERROR', error);
  }
};

function* getTypes() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const types = yield call(api.get, '/types/getTypes', config(token));
    yield put(setTypessAction(types.data.types));
  } catch (error) {
    console.log('ERROR ON GETTYPES', error);
  }
};

function* getFilterCount({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { filter } = payload;
    const count = yield call(api.get, `/users/filterCount/${filter}`, config(token));
    yield put(setCountAction(count.data));
  } catch (error) {
    console.log('Get Users List Error>>>', error);
  }
};

function* updateTypes({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { typeId, typeTitle } = payload;
    yield call(api.patch, '/types/update', { typeId, typeTitle}, config(token));

    const types = yield call(api.get, '/types/getTypes', config(token));
    const users = yield call(api.get, `/users/getUsers/${1}`, config(token));
    const profile = yield call(api.get, '/users/getMyProfile', config(token));

    yield put(setTypessAction(types.data.types));
    yield put(saveUsersListAction(users.data));
    yield put(saveUserData(profile.data));
  } catch (error) {
    console.log('ERROR AT UPDATE TYPES>>>', error);
  }
};

function* createType({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { typeTitle } = payload;
    yield call(api.post, '/types/create', { typeTitle }, config(token));

    const types = yield call(api.get, '/types/getTypes', config(token));
    yield put(setTypessAction(types.data.types));
  } catch (error) {
    console.log('Error at createType>>', error);
  }
};

function* deleteType({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { titleId } = payload;
    yield call(api.delete, `/types/${titleId}`, config(token));

    const types = yield call(api.get, '/types/getTypes', config(token));
    const users = yield call(api.get, `/users/getUsers/${1}`, config(token));
    const profile = yield call(api.get, '/users/getMyProfile', config(token));

    yield put(saveUsersListAction(users.data));
    yield put(setTypessAction(types.data.types));
    yield put(saveUserData(profile.data));
  } catch (error) {
    console.log('Error at deleteType', error);
  }
};

export default function* typesSaga() {
  yield all([
    takeLatest(getCountAction, getCout),
    takeLatest(getTypesAction, getTypes),
    takeLatest(getFilterCountAction, getFilterCount),
    takeLatest(updateTypeAction, updateTypes),
    takeLatest(createTypeAction, createType),
    takeLatest(deleteTypeAction, deleteType),
  ]);
};
