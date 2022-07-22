import { getCustomRepository, Repository } from 'typeorm';

import Product from '../../entities/Product';
import AppError from '../../errors';
import { ProductRepository } from '../../repositories/ProductsRepository';

interface IRequest {
  name: string; // IResquest esta fazendo uma tipagem
  price: number;
  quantity: number;
}

class CreateProductService {
  private productsRepository: Repository<Product>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductRepository); // toda vez que usar classe privada deve se usar (this)
  }
  async create({ name, price, quantity }: IRequest) {
    const productExists = await this.productsRepository.findOne({ name }); // this serve para chamat o constructor

    if (productExists) {
      throw new AppError('there is already one product with this name', 409);
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(product); // se passar do if salva no banco de dados

    return product;
  }
}
export default CreateProductService;
