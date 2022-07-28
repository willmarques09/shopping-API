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
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne({ id });
    const productExists = await productsRepository.findOne({ name });

    if (!product) {
      throw new AppError('product not found', 404);
    }

    if (productExists && product.name !== name) {
      console.log(`${product.name} aeeeeaeee euuu aki`);
      console.log(`${productExists}   AAAAAbo`);

      throw new AppError('there is already one product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
