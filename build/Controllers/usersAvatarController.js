"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _updateUserAvatarService = _interopRequireDefault(require("../services/userService/updateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersAvatarController {
  async updateAvatar(req, res) {
    const updateAvatar = _tsyringe.container.resolve(_updateUserAvatarService.default);

    const user = await updateAvatar.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename
    });
    return res.json(user);
  }

}

exports.default = UsersAvatarController;