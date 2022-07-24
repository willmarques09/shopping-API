import { Router } from 'express';

import productsRouter from './products';
import usersRouter from './users';
import sessionRouter from './users/session.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
