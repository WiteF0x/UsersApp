import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../utils/axios';
import { singInAction, singUpAction } from '../actions/auth';
import { saveUserData } from '../actions/users';
import { pushError } from '../actions/error';

const config = (token) => {
  return {
    headers: {
      'auth-token': token
    }
  }
};

function* signIn({ payload }) {
  try {
    const { login, password } = payload;
    const data = yield call(api.post, '/auth/login', { login, password })
    if (data.data.token) {
      localStorage.setItem('token', JSON.stringify(data.data.token));
      const profile = yield call(api.get, '/users/getMyProfile', config(data.data.token))
      yield put(saveUserData(profile.data));
      yield put(pushError(''));
      payload.goHome();
    }
  } catch (error) {
    yield put(pushError('Invalid login or password'));
    console.log('signInError>>>', error);
  }
}

function* signUp({ payload }) {
  try {
    const {
      firstName,
      lastName,
      userName,
      login,
      password,
      userInfo,
    } = payload;
    console.log('HERE!');
    const data = yield call(api.post, '/auth/register', { firstName, lastName, userName, login, password, userInfo });
    if (data.data.token) {
      localStorage.setItem('token', JSON.stringify(data.data.token));
      const profile = yield call(api.get, '/users/getMyProfile', config(data.data.token))
      yield put(saveUserData(profile.data));
      yield put(pushError(''));
      payload.goHome();
    } else {
      yield put(pushError(data.data.message));
    }
  } catch (error) {
    console.log('signUp Error>>>', error);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(singInAction, signIn),
    takeLatest(singUpAction, signUp),
  ]);
}