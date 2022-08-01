/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { pagination } from 'typeorm-pagination';
import 'reflect-metadata';
import './container';
import cors from 'cors';
import express from 'express';

import './database';

import 'express-async-errors';
import { errors } from 'celebrate';

import AppError from './errors';
import routes from './routes';
import uploadConfing from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use('/files', express.static(uploadConfing.directory));

app.use(routes);

app.use(errors());

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
    message: error.message,
  });
});

export { app };
