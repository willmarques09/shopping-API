import { getCustomRepository } from 'typeorm';

import { ProductRepository } from '../repositories/ProductsRepository';

class ListProductService {
  public async execute() {
    const ProductsRepository = getCustomRepository(ProductRepository);

    const products = ProductsRepository.find();

    return products;
  }
}
export default ListProductService;
