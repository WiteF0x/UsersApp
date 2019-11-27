import {
  take,
  call,
  apply,
  fork,
  all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { getUpdateAction, setUpdateAction } from '../actions/socket';
import SocketIOClient from 'socket.io-client';

let SOCKET = null;

function createSocketChannel(socket, store) {
  return eventChannel((emit) => {
    const errorHandler = (errorEvent) => {
      console.log('errorHandler');
      emit(new Error(errorEvent));
    };

    const eventHandler = (event) => {
      console.log('event', event);
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event);
    };

    socket.on('receiveFrom', eventHandler);
    socket.on('error', errorHandler);

    socket.on('connection')
    socket.on('updated', (user) => {
      store.dispatch(setUpdateAction(user))
    })
    const unsubscribe = () => {
      socket.off('receiveFrom', eventHandler);
    };

    return unsubscribe;
  });
}

function* emitResponse(socket) {
  yield apply(socket, socket.emit, ['message received']);
}

function* updateAnotherUsers(socket) {
  while(true) {
    try {
      const user = yield take(getUpdateAction);
      socket.emit('updateListen', user.payload);
    } catch (error) {
      console.log('updateAnotherUsers ERROR')
    }
  }
}

function* watchSocketChannel(store) {
  if (!SOCKET) {
    SOCKET = yield call(SocketIOClient, 'http://localhost:9000', { transports: ['websocket'] });
    yield fork(updateAnotherUsers, SOCKET);
    const socketChannel = yield call(createSocketChannel, SOCKET, store);
    while (true) {
      try {
        const payload = yield take(socketChannel);
        yield fork(emitResponse, SOCKET);
      } catch (err) {
        console.log('socket error: ', err);
        yield fork(watchSocketChannel);
      }
    }
  }
}

export default function* initSocket(store) {
  yield all([
    fork(watchSocketChannel, store),
  ]);
}
