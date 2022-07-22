import { Router } from 'express';

import { ProductsContoller } from '../../Controllers/ProductsController';
import {
  validationDelete,
  validationGetById,
  validationPost,
  validationPut,
} from './validation';

const productsRouter = Router();
const productsContoller = new ProductsContoller();

productsRouter.get('/', productsContoller.list); // faz a listagem de todos os produtos

productsRouter.get('/:id', validationGetById, productsContoller.listById); // procura um produto pelo seu id

productsRouter.post('/', validationPost, productsContoller.create); // cria novos produtos

productsRouter.put('/:id', validationPut, productsContoller.update); // faz o update por id

productsRouter.delete('/:id', validationDelete, productsContoller.delete); // delete por id

export default productsRouter;
