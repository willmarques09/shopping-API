import 'reflect-metadata';
import AppError from '../../../errors';
import FakeCustomersRepository from '../../../repositories/fakes/customerRepository';
import DeleteCustomerService from '../deleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;

describe('Delete Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('Should be able to remove a new customer', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');

    expect(undefined); // pq espera expect undefined
  });

  it('Should not be able to remove twice', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');

    expect(
      deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Custom not found', () => {
    const removeCustom = deleteCustomer.delete(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(removeCustom).rejects.toBeInstanceOf(AppError);
  });
});
