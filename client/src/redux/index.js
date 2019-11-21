import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './sagas';
import user from './reducers/userReducer';
import usersList from './reducers/usersListReducer';
import count from './reducers/countReducer';
import types from './reducers/typesReducer';
import error from './reducers/errorsReducer';

const rootReducer = combineReducers({
  user,
  types,
  usersList,
  error,
  count,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(
  rootReducer,
  middlewares,
);

sagaMiddleware.run(sagas);

export default store;