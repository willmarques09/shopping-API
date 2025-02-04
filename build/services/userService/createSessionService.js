"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../config/auth"));

var _errors = _interopRequireDefault(require("../../errors"));

var _IHash = require("../../interface/IHash");

var _IUsers = require("../../interface/IUsers");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository, typeof _IHash.IHashProvider === "undefined" ? Object : _IHash.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSessionService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async create({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _errors.default('incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await (0, _bcryptjs.compare)(password, user.password); // compara a senha do usuario com a senha criptografada

    if (!passwordConfirmed) {
      throw new _errors.default('incorrect email/password combination.', 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateSessionService;
exports.default = _default;