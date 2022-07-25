import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { CustomersRepository } from '../../repositories/customersRepository';

interface IRequest {
  name: string; // IResquest esta fazendo uma tipagem
  email: string;
}

class CreateCustomerService {
  public async create({ name, email }: IRequest) {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findOne({ email });
    if (emailExists) {
      throw new AppError('email address already used');
    }

    const customer = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
