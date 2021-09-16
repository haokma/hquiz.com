import { all } from 'redux-saga/effects';
import userSaga from 'features/User/userSaga';
import authSaga from 'features/Auth/authSaga';

export default function* rootSaga() {
  yield all([userSaga(), authSaga()]);
}
