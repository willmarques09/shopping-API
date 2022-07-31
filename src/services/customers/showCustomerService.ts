import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { ICustomersRepository } from '../../interface/ICustomer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async listById(id: string) {
    const customer = await this.customersRepository.findById(id); // lista todos os produtos

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }
    return customer;
  }
}
export default ShowCustomerService;
