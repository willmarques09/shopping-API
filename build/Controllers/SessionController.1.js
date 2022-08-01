"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _createSessionService = _interopRequireDefault(require("../services/userService/createSessionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionController {
  async create(req, res) {
    const {
      email,
      password
    } = req.body;

    const createSession = _tsyringe.container.resolve(_createSessionService.default);

    const user = await createSession.create({
      email,
      password
    });
    return res.json(user);
  }

}

exports.default = SessionController;