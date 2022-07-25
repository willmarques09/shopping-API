import { getCustomRepository } from 'typeorm';

import { CustomersRepository } from '../../repositories/customersRepository';

class ListCustomerService {
  public async list() {
    const customersRepository = getCustomRepository(CustomersRepository); // repositorio costumizado

    const customers = await customersRepository.find(); // lista todos os produtos

    return customers;
  }
}
export default ListCustomerService;
