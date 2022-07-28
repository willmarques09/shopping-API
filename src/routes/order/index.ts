import { Router } from 'express';

import { OrdersControllers } from '../../Controllers/orderControllers';
import isAuthenticated from '../users/isAuthenticated';

const ordersController = new OrdersControllers();
const ordersRouter = Router();

ordersRouter.use(isAuthenticated);
ordersRouter.get('/:id', ordersController.list);
ordersRouter.post('/', ordersController.create);

export default ordersRouter;

/* put --- muda tudo
  patch --- muda alguns arquivos
*/
