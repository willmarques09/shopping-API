import { getCustomRepository, Repository } from 'typeorm';

import Product from '../entities/Product';
import AppError from '../errors';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  private productsRepository: Repository<Product>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductRepository);
  }
  async execute({ name, price, quantity }: IRequest) {
    const productExists = await this.productsRepository.findOne(name);

    if (productExists) {
      throw new AppError('there is already one product with this name');
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(product);

    return product;
  }
}
export default CreateProductService;
