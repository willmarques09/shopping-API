import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { CustomersRepository } from '../../repositories/customersRepository';

interface IResquest {
  id: string;
}
class ShowCustomerService {
  public async listById({ id }: IResquest) {
    const customersRepository = getCustomRepository(CustomersRepository); // repositorio costumizado

    const customer = await customersRepository.findOne({ id }); // lista todos os produtos

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }
    return customer;
  }
}
export default ShowCustomerService;
