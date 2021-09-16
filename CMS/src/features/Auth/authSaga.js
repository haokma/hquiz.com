import authApi from 'apis/authApi';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { login, loginFail, loginSuccess, logout } from './authSlice';

function* handleLogin(payload) {
  try {
    const res = yield call(authApi.login, payload.payload);
    const { data, token, refreshToken } = res.data;
    const user = {
      role: data.role,
      name: data.name,
      email: data.email
    };

    if (data.role !== 'ADMIN') {
      toast.error('Đăng nhập thất bại');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    yield put({
      type: loginSuccess.type,
      payload: user
    });
    yield put(push('/dashboard'));
    toast.success('Đăng nhập thành công');
  } catch (error) {
    toast.error(error.response.data.error);
    yield put({
      type: loginFail.type
    });
  }
}

function* handleLogout() {
  yield put(push('/login'));
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  toast.success('Đăng xuẩt thành công');
}
// function* watchLoginFlow() {
//   while (true) {
//     const isLoggedIn = Boolean(localStorage.getItem('token'));
//     if (!isLoggedIn) {
//       const action = yield take(login.type);
//       yield fork(handleLogin, action.payload);
//     }
//     yield take([logout.type]);
//     yield call(handleLogout);
//   }
// }

export default function* authSaga() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
