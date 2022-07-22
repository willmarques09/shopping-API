/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express'; // tipagem

import CreateProductService from '../services/productsService/CreateProductsService';
import DeleteProductService from '../services/productsService/DeleteProductService';
import ListProductService from '../services/productsService/ListProductService';
import ShowProductService from '../services/productsService/ShowProductService';
import UpdateProductService from '../services/productsService/UpdateProductService';

class ProductsContoller {
  public async list(req: Request, res: Response) {
    const listProducts = new ListProductService();

    const product = await listProducts.list(); // lista todos produtos

    return res.json(product);
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const showProduct = new ShowProductService();

    const product = await showProduct.listById({ id });

    return res.json(product);
  }
  public async create(req: Request, res: Response) {
    const { name, price, quantity } = req.body; // body e passado no corpo da requisiçao geramente com json

    const createProduct = new CreateProductService();

    const product = await createProduct.create({
      name,
      price,
      quantity,
    });
    return res.json(product); // se tudo tiver nos parametro cria se um produto
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body; // corpo da requisicao por json
    const { id } = req.params; // passado no parametro

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.update({
      id, // onde id e passa no parametro
      name, // sao passado no corpo da requisicao sendo json
      price, // sao passado no corpo da requisicao sendo json
      quantity, // sao passado no corpo da requisicao sendo json
    });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const deleteProduct = new DeleteProductService();

    await deleteProduct.delete({ id });
    return res.status(200).json({ message: 'product removed successfully' });
  }
}

export { ProductsContoller };
