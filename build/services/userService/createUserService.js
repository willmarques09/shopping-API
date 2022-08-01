"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _typeorm = require("typeorm");

var _errors = _interopRequireDefault(require("../../errors"));

var _IHash = require("../../interface/IHash");

var _IUsers = require("../../interface/IUsers");

var _UsersRepository = require("../../repositories/UsersRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository, typeof _IHash.IHashProvider === "undefined" ? Object : _IHash.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async create({
    name,
    email,
    password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UserRepository);
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new _errors.default('email address already used');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8); // criar criptografia para senha

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await userRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;