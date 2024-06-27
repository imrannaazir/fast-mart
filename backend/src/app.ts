import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();
// parser
app.use(express.json());

const allowedOrigins = [
  'https://fast-mart.vercel.app',
  'https://admin-fastmart.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);
app.use(cookieParser());

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

// all route
app.use('/api/v1', router);

// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
