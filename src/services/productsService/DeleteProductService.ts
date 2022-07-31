import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async delete(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id); // findOne buscar o id

    if (!product) {
      throw new AppError('product not found', 404);
    }

    await this.productsRepository.remove(product);
  }
}
export default DeleteProductService;
