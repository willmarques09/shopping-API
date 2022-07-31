import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { ICreateProduct } from '../../interface/IProducts/interfaces';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async create({ name, price, quantity }: ICreateProduct) {
    const productExists = await this.productsRepository.findByName(name); // this serve para chamat o constructor

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
