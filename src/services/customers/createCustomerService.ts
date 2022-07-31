import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import {
  ICreateCustomer,
  ICustomersRepository,
} from '../../interface/ICustomer';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async create({ name, email }: ICreateCustomer) {
    const emailExists = await this.customersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('email address already used');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
