"use strict";

require("reflect-metadata");

var _fakeHashProvider = _interopRequireDefault(require("../../../config/fake/fakeHashProvider"));

var _errors = _interopRequireDefault(require("../../../errors"));

var _userRepository = _interopRequireDefault(require("../../../repositories/fakes/userRepository"));

var _createUserService = _interopRequireDefault(require("../createUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let createUser;
let fakeHashProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _userRepository.default();
    fakeHashProvider = new _fakeHashProvider.default();
    createUser = new _createUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users with the same email', async () => {
    await createUser.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com',
      password: '123456'
    });
    expect(createUser.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_errors.default);
  });
});