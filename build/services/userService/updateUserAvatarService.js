"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _tsyringe = require("tsyringe");

var _upload = _interopRequireDefault(require("../../config/upload"));

var _errors = _interopRequireDefault(require("../../errors"));

var _IUsers = require("../../interface/IUsers");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserAvatarService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async updateAvatar({
    id,
    avatar
  }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new _errors.default('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = _path.default.join(_upload.default.directory, user.avatar); // Vai passar a informação de onde encontrar o arquivo


      const userAvatarExists = await _fs.default.promises.stat(userAvatarFilePath); // Verifica se o arquivo existe

      if (userAvatarExists) {
        await _fs.default.promises.unlink(userAvatarFilePath); // Se existir vai remover
      }
    }

    user.avatar = avatar;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateUserAvatarService;
exports.default = _default;