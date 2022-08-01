import 'reflect-metadata';
import AppError from '../../../errors';
import FakeCustomersRepository from '../../../repositories/fakes/customerRepository';
import CreateCustomerService from '../createCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    await createCustomer.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com',
    });

    expect(
      createCustomer.create({
        name: 'Willhan Marques',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
