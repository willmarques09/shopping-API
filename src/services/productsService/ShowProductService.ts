import { getCustomRepository } from 'typeorm';

import Product from '../../entities/productsEntitie';
import AppError from '../../errors';
import { ProductRepository } from '../../repositories/ProductsRepository';

interface IRequest {
  id: string;
}
class ShowProductService {
  public async listById({ id }: IRequest): Promise<Product> {
    const ProductsRepository = getCustomRepository(ProductRepository); // repositori customizado

    const product = await ProductsRepository.findOne(id); // vai buscar pelo id

    if (!product) {
      throw new AppError('product not found', 404);
    }

    return product;
  }
}
export default ShowProductService;
