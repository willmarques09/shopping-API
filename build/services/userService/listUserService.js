"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsers = require("../../interface/IUsers");

var _dec, _dec2, _dec3, _dec4, _class;

let ListUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async list({
    page,
    limit
  }) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const listUsers = await this.usersRepository.findAll({
      page,
      skip,
      take
    });
    return listUsers;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListUserService;
exports.default = _default;