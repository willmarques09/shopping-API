"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _customerRepository = _interopRequireDefault(require("../../../repositories/fakes/customerRepository"));

var _deleteCustomerService = _interopRequireDefault(require("../deleteCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let deleteCustomer;
describe('Delete Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _customerRepository.default();
    deleteCustomer = new _deleteCustomerService.default(fakeCustomersRepository);
  });
  it('Should be able to remove a new customer', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(undefined); // pq espera expect undefined
  });
  it('Should not be able to remove twice', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c')).rejects.toBeInstanceOf(_errors.default);
  });
  it('Custom not found', () => {
    const removeCustom = deleteCustomer.delete('083a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(removeCustom).rejects.toBeInstanceOf(_errors.default);
  });
});