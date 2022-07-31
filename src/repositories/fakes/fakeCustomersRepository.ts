import { v4 as uuid } from 'uuid';

import CustomersEntitie from '../../entities/customersEntitie';

interface IFakeCustom {
  name: string;
  email: string;
}

export default class FakeCustom {
  private customers = [];

  async create({ name, email }: IFakeCustom) {
    const customer = new CustomersEntitie();

    customer.id = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }
}
