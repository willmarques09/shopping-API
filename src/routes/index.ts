import { Router } from 'express';

import productsRouter from './products';
import usersRouter from './users';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
