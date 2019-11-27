import {
  put,
  all,
  call,
  select,
  takeLatest,
  delay,
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
import { setUpdateAction, getUpdateAction } from '../actions/socket';

const сurrentUserList = state => state.usersList.usersList;

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
    const {
      userId,
      typeTitle,
      myProf,
      type,
      pageNumber,
      userName,
      firstName,
      lastName,
      userInfo,
      userTypes,
    } = payload;
    yield put(getUpdateAction({ userId, userName, firstName, lastName, userInfo, userTypes }))
    const data = yield call(api.delete, `/users/type/remove/${typeTitle}/${userId}`, config(token));
    if (data.data.message === 'Completed!') {
      if (myProf === true){
        const user = yield call(api.get, `/users/getMyProfile`, config(token));
        yield put(saveUserData(user.data));
      }

      let users;
      if (type && pageNumber) {
        users = yield call(api.get, `/users/filter/${type}/${pageNumber}/5`, config(token));
      } else if (pageNumber){
        users = yield call(api.get, `/users/getUsers/${pageNumber}/5`, config(token));
      } else {
        users = yield call(api.get, `/users/getUsers/1/5`, config(token));
      }
      yield all([
        put(saveUsersListAction(users.data.users)),
        put(setCountAction(users.data.count)),
      ])
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
      userTypes,
      userId,
      userName,
      firstName,
      lastName,
      userInfo,
      login,
    } = payload;
    yield call(api.patch, '/users/updateUser', { userName, firstName, lastName, userInfo, login }, config(token));
    yield put(getUpdateAction({ userId, userName, firstName, lastName, userInfo, userTypes }));
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
    const { filter, number, usersPerPage } = payload;
    if (payload.filter) {
      users = yield call(api.get, `/users/filter/${filter}/${number}/${usersPerPage}`, config(token));
    } else {
      users = yield call(api.get, `/users/getUsers/${payload.number}/${usersPerPage}`, config(token));
    }
    yield all([
      put(saveUsersListAction(users.data.users)),
      put(setCountAction(users.data.count)),
    ])
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
    const users= yield call(api.get, `/users/getUsers/1`, config(token));
    yield all([
      put(saveUsersListAction(users.data.users)),
      put(setCountAction(users.data.count)),
    ])
  } catch (error) {
    console.log('Delete user error!', error);
  }
};

function* addTypeToUser({ payload }) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const {
      userId,
      typeTitle,
      userName,
      firstName,
      lastName,
      userInfo,
      userTypes,
    } = payload;
    yield put(getUpdateAction({ userId, userName, firstName, lastName, userInfo, userTypes }))
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

function* setUpdate({ payload }) {
  try {
    let isExisted = false;
    const users = yield select(сurrentUserList);
    users.map((item) => {
      if (item._id === payload.userId) isExisted = true;
      return null;
    });
    if (isExisted === true) {
      let updatedUsers = [];
      users.map((item) => {
        if (item._id === payload.userId) {
          updatedUsers.push({
            _id: payload.userId,
            userName: payload.userName,
            firstName: payload.firstName,
            lastName: payload.lastName,
            userInfo: payload.userInfo,
            userTypes: payload.userTypes,
          })
        } else {
          updatedUsers.push(item);
        }
        return null;
      });
      yield put(saveUsersListAction(updatedUsers));
    }
  } catch (error) {
    console.log('setUpdate Error>>>', error);
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
    takeLatest(setUpdateAction, setUpdate),
  ]);
}