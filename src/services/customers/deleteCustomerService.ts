import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { ICustomersRepository } from '../../interface/ICustomer';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async delete(id: string) {
    const customer = await this.customersRepository.findById(id); // lista todos os produtos

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }
    await this.customersRepository.remove(customer);
  }
}
export default DeleteCustomerService;
