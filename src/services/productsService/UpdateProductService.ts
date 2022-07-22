import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { ProductRepository } from '../../repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async update({ id, name, price, quantity }: IRequest) {
    const ProductsRepository = getCustomRepository(ProductRepository);

    const product = await ProductsRepository.findOne(id);

    if (!product) {
      throw new AppError('product not found', 404);
    }

    const productExists = ProductsRepository.findOne(name);

    if (productExists && name !== product.name) {
      throw new AppError('there is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
