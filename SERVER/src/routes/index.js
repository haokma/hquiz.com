const express = require('express');
const authRouter = require('./user.router');

const apiRoute = express();

apiRoute.use('/auth', authRouter);

module.exports = apiRoute;
