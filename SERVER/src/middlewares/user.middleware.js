const jwt = require('jsonwebtoken');
const { ROLE_ADMIN } = require('../constants');
const { isEmail, isEmpty } = require('../helpers/validator');
const User = require('../models/user.model');

validatorSignUp = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors['email'] = 'Vui lòng nhâp email!';
  } else if (!isEmail(data.email)) {
    errors['email'] = 'Định dạng email không hợp lệ!';
  }
  if (isEmpty(data.password)) {
    errors['email'] = 'Vui lòng nhập mật khẩu';
  } else if (data.password.length < 6) {
    errors['password'] = 'Mật khẩu phải chứa ít nhất 6 kí tự';
  }
  if (data.password !== data.confirmPassword) {
    errors['confirmPassword'] = 'Mật khẩu không trùng khớp';
  }
  if (isEmpty(data.username)) {
    errors['username'] = 'Vui lòng nhập tên đăng nhập';
  } else if (data.username.length < 3) {
    errors['username'] = 'Tên đăng nhập phải chứa ít nhất 3 kí tự';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

validatorLogin = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors['email'] = 'Vui lòng nhâp email!';
  } else if (!isEmail(data.email)) {
    errors['email'] = 'Định dạng email không hợp lệ!';
  }
  if (isEmpty(data.password)) {
    errors['password'] = 'Vui lòng nhâp mật khẩu!';
  } else if (data.password.trim().length < 6) {
    errors['password'] = 'Mật khẩu phải chứa ít nhất 6 kí tự';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(token, '1');
    const user = await User.findById(id);
    if (user.role === ROLE_ADMIN) {
      return next();
    }
    res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
  } catch (error) {
    res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
  }
};

authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, '2');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Vui lòng đăng nhập !' });
  }
};

module.exports = {
  adminMiddleware,
  authMiddleware,
  validatorLogin,
  validatorSignUp,
};
