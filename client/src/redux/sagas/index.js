import { fork } from 'redux-saga/effects';
import auth from './authSaga';
import types from './typesSaga';
import users from './usersSaga';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(types);
  yield fork(users);
}