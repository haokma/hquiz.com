const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

const connectDatabase = require('./configs/db.config');

const router = require('./routes');

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/api', router);

connectDatabase();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
