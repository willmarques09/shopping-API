import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import {
  ICustomersRepository,
  IUpdateCustomer,
} from '../../interface/ICustomer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async update({ id, name, email }: IUpdateCustomer) {
    const customer = await this.customersRepository.findById(id); // lista todos os produtos

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one costumer with this email.', 409);
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
