"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _customerRepository = _interopRequireDefault(require("../../../repositories/fakes/customerRepository"));

var _listCustomerService = _interopRequireDefault(require("../listCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let listCustomer;
let page;
let limit;
describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _customerRepository.default();
    listCustomer = new _listCustomerService.default(fakeCustomersRepository);
    page = 1;
    limit = 15;
  });
  it('Should be able to list customers', async () => {
    await listCustomer.list({
      page,
      limit
    });
    expect(listCustomer);
  });
  it('Should be able to list by Id', async () => {
    const data = await listCustomer.listById('983a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(data);
  });
  it('Custom not found', () => {
    const listCustom = listCustomer.listById('083a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(listCustom).rejects.toBeInstanceOf(_errors.default);
  });
});