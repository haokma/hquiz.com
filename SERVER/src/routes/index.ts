import express from 'express';
import authRouter from './user.router';

const apiRoute = express();

apiRoute.use('/auth', authRouter);

export default apiRoute;
