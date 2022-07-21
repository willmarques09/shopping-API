import { getCustomRepository } from 'typeorm';

import AppError from '../errors';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}
class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const ProductsRepository = getCustomRepository(ProductRepository);

    const product = await ProductsRepository.findOne(id);

    if (!product) {
      throw new AppError('product not found');
    }

    await ProductsRepository.remove(product);
  }
}
export default DeleteProductService;
