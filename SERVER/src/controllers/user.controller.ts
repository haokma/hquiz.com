import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Pagination from '../helpers/pagination';
import { validatorLogin, validatorSignUp } from '../middlewares/user.middleware';
import User from '../models/user.model';

const createToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, '1', {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });
};

const createRefreshToken = (id: string) => {
  return jwt.sign({ id }, '2', {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
};

const verifyJwtToken = (token: string, secretKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const AuthController: any = {
  login: async (req: Request, res: Response) => {
    const { valid, errors } = validatorLogin(req.body);
    if (!valid) return res.status(400).json({ error: errors });
    const { email, password } = req.body;

    try {
      const user: any = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: 'Người dùng không  tồn tại',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: 'Thông tin không hợp lệ!' });

      const token = createToken(user._id, user.email);
      const refreshToken = createRefreshToken(user._id);

      res.status(200).json({
        data: user,
        token,
        refreshToken,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  register: async (req: Request, res: Response) => {
    const { valid, errors } = validatorSignUp(req.body);
    if (!valid) return res.status(400).json({ error: errors });
    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: 'Người dùng đã tồn tại',
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const data: any = await User.create({
        username,
        email,
        password: hashPassword,
      });

      const refreshToken = createRefreshToken(data._id);
      const token = createToken(data._id, data.email);

      return res.status(200).json({
        data,
        token,
        refreshToken,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (refreshToken) {
      try {
        const decoded: any = await verifyJwtToken(refreshToken, '2');
        const user: any = await User.findById(decoded.id);
        if (!user) {
          return res.status(403).json({
            error: 'Vui lòng đăng nhập',
          });
        }

        const token = createToken(user._id, user.email);
        return res.status(200).json({
          token,
        });
      } catch (error) {
        res.status(403).json({
          error: 'Vui lòng đăng nhập',
        });
      }
    } else {
      res.status(403).json({
        error: 'Vui lòng đăng nhập',
      });
    }
  },
  getUserList: async (req: Request, res: Response) => {
    let { page, limit, order, orderBy, name_like }: any = req.query;
    let skip, sort;

    try {
      name_like = name_like || '';
      page = Pagination.page(page);
      limit = Pagination.limit(limit);
      skip = Pagination.skip(page, limit);
      sort = Pagination.sort(order, orderBy);

      const userList = await User.find({
        username: { $regex: name_like },
      })
        .sort(sort)
        .skip(skip)
        .limit(limit);

      res.json({
        user: userList,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getUserId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          error: 'Không tìm thấy người dùng',
        });
      }

      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateUser = req.body;

    try {
      const isCheck = await User.findById(id);
      if (!isCheck) {
        return res.status(400).json({
          error: 'Không tìm thấy danh mục',
        });
      }

      const user = await User.findByIdAndUpdate(id, updateUser, {
        new: true,
      });
      res.status(200).json({
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

export default AuthController;
