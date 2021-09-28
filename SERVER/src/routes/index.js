const express = require('express');
const authRouter = require('./user.router');
const categoryRouter = require('./category.router');
const topicRouter = require('./topic.router');

const apiRoute = express();

apiRoute.use('/auth', authRouter);
apiRoute.use('/category', categoryRouter);
apiRoute.use('/topic', topicRouter);

module.exports = apiRoute;
