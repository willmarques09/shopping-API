import { inject, injectable } from 'tsyringe';

import { ICustomersRepository, ISearchParams } from '../../interface/ICustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const listCustom = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return listCustom;
  }
}

export default ListCustomerService;
