import { Router } from 'express';

import productsRouter from './products';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'funciona Obaa' });
});

export default routes;
