import { getCustomRepository } from 'typeorm';

import Product from '../entities/Product';
import AppError from '../errors';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}
class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const ProductsRepository = getCustomRepository(ProductRepository);

    const product = await ProductsRepository.findOne(id);

    if (!product) {
      throw new AppError('product not found');
    }

    return product;
  }
}
export default ShowProductService;
