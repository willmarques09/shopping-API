import { inject, injectable } from 'tsyringe';

import { ISearchParams } from '../../interface/ICustomer';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const listCustom = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return listCustom;
  }
}
export default ListProductService;
