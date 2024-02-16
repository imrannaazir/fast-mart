import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import notFoundHandler from './app/middlewares/notFoundHandler';

const app: Application = express();
// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

// handle 404 error
app.use(notFoundHandler);

export default app;
