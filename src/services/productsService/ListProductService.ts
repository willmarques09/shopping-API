import { getCustomRepository } from 'typeorm';

import { ProductRepository } from '../../repositories/ProductsRepository';

class ListProductService {
  public async list() {
    const ProductsRepository = getCustomRepository(ProductRepository); // repositorio costumizado

    const products = ProductsRepository.find(); // lista todos os produtos

    return products;
  }
}
export default ListProductService;
