import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async listById(id: string) {
    const product = await this.productsRepository.findById(id); // vai buscar pelo id

    if (!product) {
      throw new AppError('product not found', 404);
    }

    return product;
  }
}
export default ShowProductService;
