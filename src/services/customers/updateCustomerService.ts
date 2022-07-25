import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { CustomersRepository } from '../../repositories/customersRepository';

interface IResquest {
  id: string;
  name: string;
  email: string;
}
class UpdateCustomerService {
  public async update({ id, name, email }: IResquest) {
    const customersRepository = getCustomRepository(CustomersRepository); // repositorio costumizado

    const customer = await customersRepository.findOne(id); // lista todos os produtos

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerExists = await customersRepository.findOne({ email });

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one costumer with this email.', 409);
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
