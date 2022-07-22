import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { ProductRepository } from '../../repositories/ProductsRepository';

interface IRequest {
  id: string; // boas pratica tipar com interface IRequest
}
class DeleteProductService {
  public async delete({ id }: IRequest): Promise<void> {
    const ProductsRepository = getCustomRepository(ProductRepository); // repositorio costumizado

    const product = await ProductsRepository.findOne(id); // findOne buscar o id

    if (!product) {
      throw new AppError('product not found', 404);
    }

    await ProductsRepository.remove(product);
  }
}
export default DeleteProductService;
