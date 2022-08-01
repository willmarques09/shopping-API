"use strict";

require("reflect-metadata");

var _errors = _interopRequireDefault(require("../../../errors"));

var _userRepository = _interopRequireDefault(require("../../../repositories/fakes/userRepository"));

var _showProfileService = _interopRequireDefault(require("../showProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let showProfileService;
describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _userRepository.default();
    showProfileService = new _showProfileService.default(fakeCustomersRepository);
  });
  it('Should be able to list by Id', async () => {
    const data = await showProfileService.showProfile('297a07e0-c937-48a3-b8dd-1c68f994d803');
    expect(data);
  });
  it('Users not found', () => {
    const listCustom = showProfileService.showProfile('083a0c77-cbfa-453a-aae6-92baff12f89c');
    expect(listCustom).rejects.toBeInstanceOf(_errors.default);
  });
});