import { Router } from 'express';

import customersRouter from './customer/customers.routes';
import ordersRouter from './order';
import productsRouter from './products';
import usersRouter from './users';
import passwordRouter from './users/password.routes';
import profileRouter from './users/profile.routes';
import sessionRouter from './users/session.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
