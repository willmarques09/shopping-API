"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _customerRepository = _interopRequireDefault(require("../../../repositories/fakes/customerRepository"));

var _updateCustomerService = _interopRequireDefault(require("../updateCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let updateCustomer;
describe('updateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _customerRepository.default();
    updateCustomer = new _updateCustomerService.default(fakeCustomersRepository);
  });
  it('Should be able to update a customer', async () => {
    const customer = await updateCustomer.update({
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com'
    });
    expect(customer).toHaveProperty('id');
  });
  it('Should not be able to update two customers with the same email', async () => {
    const otherCustom = updateCustomer.update({
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'hewwlo2@gmail.com'
    });
    expect(otherCustom).rejects.toBeInstanceOf(_errors.default);
  });
  it('Custom not found', () => {
    const listCustom = updateCustomer.update({
      id: '083a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'hewwlo2@gmail.com'
    });
    expect(listCustom).rejects.toBeInstanceOf(_errors.default);
  });
});