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
    const token = yield call(api.post, '/auth/login', { login, password })
    if (token.data.token) {
      localStorage.setItem('token', JSON.stringify(token.data.token));
      const profile = yield call(api.get, '/users/getMyProfile', config(token.data.token))
      yield all([
        put(saveUserData(profile.data)),
        put(pushError('')),
      ])
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
    const token = yield call(api.post, '/auth/register', { firstName, lastName, userName, login, password, userInfo });
    if (token.data.token) {
      localStorage.setItem('token', JSON.stringify(token.data.token));
      const profile = yield call(api.get, '/users/getMyProfile', config(token.data.token))
      yield all([
        put(saveUserData(profile.data)),
        put(pushError('')),
      ])
      payload.goHome();
    } else {
      yield put(pushError(token.data.message));
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