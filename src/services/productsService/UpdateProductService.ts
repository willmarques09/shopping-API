import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IUpdateProduct } from '../../interface/IProducts/interfaces';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

injectable();
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async update({ id, name, price, quantity }: IUpdateProduct) {
    const product = await this.productsRepository.findById(id);
    const productExists = await this.productsRepository.findByName(name);

    if (!product) {
      throw new AppError('product not found', 404);
    }

    if (productExists && product.name !== name) {
      throw new AppError('there is already one product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
