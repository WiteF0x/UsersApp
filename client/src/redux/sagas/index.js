import { fork } from 'redux-saga/effects';
import auth from './authSaga';
import types from './typesSaga';
import users from './usersSaga';
import socketChanel from './socketChanel';

export default function* rootSaga(store) {
  yield fork(auth);
  yield fork(types);
  yield fork(users);
  yield fork(socketChanel, store);
}