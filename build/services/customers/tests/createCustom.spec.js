"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _customerRepository = _interopRequireDefault(require("../../../repositories/fakes/customerRepository"));

var _createCustomerService = _interopRequireDefault(require("../createCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let createCustomer;
describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _customerRepository.default();
    createCustomer = new _createCustomerService.default(fakeCustomersRepository);
  });
  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com'
    });
    expect(customer).toHaveProperty('id');
  });
  it('Should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new _customerRepository.default();
    const createCustomer = new _createCustomerService.default(fakeCustomersRepository);
    await createCustomer.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com'
    });
    expect(createCustomer.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com'
    })).rejects.toBeInstanceOf(_errors.default);
  });
});