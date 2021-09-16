import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ROLE_ADMIN } from '../constants';
import { isEmail, isEmpty } from '../helpers/validator';
import User from '../models/user.model';
export const validatorSignUp = (data: any) => {
  let errors: any = {};
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

export const validatorLogin = (data: any) => {
  let errors: any = {};
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

export const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id }: any = jwt.verify(token, '1');
    const user: any = await User.findById(id);
    if (user.role === ROLE_ADMIN) {
      return next();
    }
    res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
  } catch (error) {
    res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
  }
};

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, '2');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Vui lòng đăng nhập !' });
  }
};
