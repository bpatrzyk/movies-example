import dotenv from 'dotenv';
import express from 'express';
import { apiV1 } from './routes/apiV1';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use('/api/v1', apiV1);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
