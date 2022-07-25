import { Router } from 'express';

import { ProductsContoller } from '../../Controllers/ProductsController';
import isAuthenticated from '../users/isAuthenticated';

const customersRouter = Router();
const customersContoller = new ProductsContoller();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersContoller.list); // faz a listagem de todos os produtos

customersRouter.get('/:id', customersContoller.listById); // procura um produto pelo seu id

customersRouter.post('/', customersContoller.create); // cria novos produtos

customersRouter.put('/:id', customersContoller.update); // faz o update por id

customersRouter.delete('/:id', customersContoller.delete); // delete por id

export default customersRouter;
