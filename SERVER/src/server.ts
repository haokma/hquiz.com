import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDatabase from './configs/db.config';

import router from './routes';

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
