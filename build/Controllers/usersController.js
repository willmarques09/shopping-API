"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _createUserService = _interopRequireDefault(require("../services/userService/createUserService"));

var _listUserService = _interopRequireDefault(require("../services/userService/listUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async list(req, res) {
    const listUser = _tsyringe.container.resolve(_listUserService.default);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const list = await listUser.list({
      page,
      limit
    });
    return res.json(list);
  }

  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    const createUser = _tsyringe.container.resolve(_createUserService.default);

    const user = await createUser.create({
      name,
      email,
      password
    });
    return res.json(user);
  }

}

exports.default = UsersController;