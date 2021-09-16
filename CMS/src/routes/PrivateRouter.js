import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRouter(props) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const isCheck = isLoggedIn && user.role === 'ADMIN';

  if (!isCheck) return <Redirect to="/login" />;
  return <Route {...props} />;
}
