"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _userRepository = _interopRequireDefault(require("../../../repositories/fakes/userRepository"));

var _listUserService = _interopRequireDefault(require("../listUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let listCustomer;
let page;
let limit;
describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _userRepository.default();
    listCustomer = new _listUserService.default(fakeCustomersRepository);
    page = 1;
    limit = 15;
  });
  it('Should be able to list users', async () => {
    await listCustomer.list({
      page,
      limit
    });
    expect(listCustomer);
  });
  it('Should be able to list by Id', async () => {
    const data = await listCustomer.listById('297a07e0-c937-48a3-b8dd-1c68f994d803');
    expect(data);
  });
  it('Users not found', () => {
    const listCustom = listCustomer.listById('083a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(listCustom).rejects.toBeInstanceOf(_errors.default);
  });
});