import { Router } from 'express';

import { ProductsContoller } from '../../Controllers/ProductsController';

const productsRouter = Router();
const productsContoller = new ProductsContoller();

productsRouter.get('/', productsContoller.execute);
productsRouter.get('/:id', productsContoller.show);
productsRouter.post('/', productsContoller.create);
productsRouter.put('/:id', productsContoller.update);
productsRouter.delete('/:id', productsContoller.delete);

export default productsRouter;
