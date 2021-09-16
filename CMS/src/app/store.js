import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import authReducer from 'features/Auth/authSlice';
import userReducer from 'features/User/userSlice';
import { history } from 'utils/history';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history))
});

sagaMiddleware.run(rootSaga);

export default store;
