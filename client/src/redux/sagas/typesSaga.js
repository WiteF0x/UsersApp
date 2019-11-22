import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../utils/axios';
import {
  getTypesAction,
  setTypessAction,
  updateTypeAction,
  createTypeAction,
  deleteTypeAction,
  setCountAction,
} from '../actions/types';
import { saveUsersListAction, saveUserData } from '../actions/users';

const config = (token) => {
  return {
    headers: {
      'auth-token': token
    }
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

function* updateTypes({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { typeId, typeTitle } = payload;
    yield call(api.patch, '/types/update', { typeId, typeTitle}, config(token));
    const [types, users, profile] = yield all([
       call(api.get, '/types/getTypes', config(token)),
       call(api.get, `/users/getUsers/${1}`, config(token)),
       call(api.get, '/users/getMyProfile', config(token)),
    ]);
    yield all([
      put(setTypessAction(types.data.types)),
      put(saveUsersListAction(users.data.users)),
      put(setCountAction(users.data.count)),
      put(saveUserData(profile.data)),
    ])
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

    const [types, users, profile] = yield all([
      call(api.get, '/types/getTypes', config(token)),
      call(api.get, `/users/getUsers/${1}`, config(token)),
      call(api.get, '/users/getMyProfile', config(token)),
    ]);
    yield all([
      put(saveUsersListAction(users.data.users)),
      put(setCountAction(users.data.count)),
      put(setTypessAction(types.data.types)),
      put(saveUserData(profile.data)),
    ]);
  } catch (error) {
    console.log('Error at deleteType', error);
  }
};

export default function* typesSaga() {
  yield all([
    takeLatest(getTypesAction, getTypes),
    takeLatest(updateTypeAction, updateTypes),
    takeLatest(createTypeAction, createType),
    takeLatest(deleteTypeAction, deleteType),
  ]);
};
