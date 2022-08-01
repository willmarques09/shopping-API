"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _showProfileService = _interopRequireDefault(require("../services/userService/showProfileService"));

var _updateProfileService = _interopRequireDefault(require("../services/userService/updateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(req, res) {
    const showProfile = _tsyringe.container.resolve(_showProfileService.default);

    const user_id = req.user.id;
    const user = await showProfile.showProfile(user_id);
    return res.json(user);
  }

  async update(req, res) {
    const user_id = req.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = req.body;

    const updateProfile = _tsyringe.container.resolve(_updateProfileService.default);

    const user = await updateProfile.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password
    });
    return res.json(user);
  }

}

exports.default = ProfileController;