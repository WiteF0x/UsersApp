import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../utils/axios';
import {
  saveUserData,
  removeUserTypeAction,
  getProfileInfoAction,
  patchUserAction,
  getUsersListAction,
  saveUsersListAction,
  deleteUserAction,
  addTypeToUserAction,
  getMyProfileAction,
} from '../actions/users';
import { setCountAction } from '../actions/types';

const config = (token) => {
  return {
    headers: {
      'auth-token': token
    }
  }
};

function* removeUserType({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { userId, typeTitle, myProf, type, pageNumber } = payload;
    const data = yield call(api.delete, `/users/type/remove/${typeTitle}/${userId}`, config(token));
    if (data.data.message === 'Completed!') {
      if (!myProf){
        const user = yield call(api.get, `/users/getMyProfile`, config(token));
        yield put(saveUserData(user.data));
      }

      let users;
      if (type && pageNumber) {
        users = yield call(api.get, `/users/filter/${type}/${pageNumber}`, config(token));
      } else if (pageNumber){
        users = yield call(api.get, `/users/getUsers/${pageNumber}`, config(token));
      } else {
        users = yield call(api.get, `/users/getUsers/1`, config(token));
      }
      yield put(saveUsersListAction(users.data));
    }
  } catch (error) {
    console.log('Error at removeUserType>>>', error);
  }
};

function* getProfileInfo({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const user = yield call(api.get, `/users/getProfile/${payload}`, config(token));
    yield put(saveUserData(user.data));
  } catch (error) {
    console.log('GetProfileError>>', error);
  }
};

function* pathUser({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const {
      userName,
      firstName,
      lastName,
      userInfo,
      login,
    } = payload;
    yield call(api.patch, '/users/updateUser', { userName, firstName, lastName, userInfo, login }, config(token));

    const profile = yield call(api.get, '/users/getMyProfile', config(token))
    yield put(saveUserData(profile.data));
    payload.goBack();
  } catch (error) {
    console.log('Error in patch>>>', error);
  }
};

function* getUsersList({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    let users;
    const { filter, number } = payload;
    if (payload.filter) {
      users = yield call(api.get, `/users/filter/${filter}/${number}`, config(token));
    } else {
      users = yield call(api.get, `/users/getUsers/${payload.number}`, config(token));
    }
    yield put(saveUsersListAction(users.data));
  } catch (error) {
    console.log('Get Users List Error>>>', error);
  }
}

function* deleteUser({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { userId } = payload;
    const data = yield call(api.delete, '/users/deleteUser', { userId }, config(token));
    if (data.data.isMyId === true) {
      localStorage.removeItem('token');
    }
    const [users, count] = yield all([
      call(api.get, `/users/getUsers/1`, config(token)),
      call(api.get, '/users/countUsers', config(token)),
    ])
    yield all([
      put(saveUsersListAction(users.data)),
      put(setCountAction(count.data)),
    ])
  } catch (error) {
    console.log('Delete user error!', error);
  }
};

function* addTypeToUser({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { userId, typeTitle } = payload;
    yield call(api.post, '/users/type/add', { userId, typeTitle }, { headers: { 'auth-token': token }});
    const profile = yield call(api.get, '/users/getMyProfile', config(token))
    yield put(saveUserData(profile.data));
  } catch (error) {
    console.log('addTypeToUser ERROR>>>', error);
  }
};

function* getMyProfile() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const profile = yield call(api.get, '/users/getMyProfile', config(token))
    yield put(saveUserData(profile.data));
  } catch (error) {
    console.log('Error at addTypeToUser>>>', error);
  }
} 

export default function* authSaga() {
  yield all([
    takeLatest(removeUserTypeAction, removeUserType),
    takeLatest(getProfileInfoAction, getProfileInfo),
    takeLatest(patchUserAction, pathUser),
    takeLatest(getUsersListAction, getUsersList),
    takeLatest(deleteUserAction, deleteUser),
    takeLatest(addTypeToUserAction, addTypeToUser),
    takeLatest(getMyProfileAction, getMyProfile),
  ]);
}