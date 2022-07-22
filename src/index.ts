/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import './database';
import 'express-async-errors';
import AppError from './errors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// eslint-disable-next-line consistent-return
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: error,
  });
});

export { app };
