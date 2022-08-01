"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../config/upload"));

var _usersAvatarController = _interopRequireDefault(require("../../Controllers/usersAvatarController"));

var _usersController = _interopRequireDefault(require("../../Controllers/usersController"));

var _isAuthenticated = _interopRequireDefault(require("./isAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const userController = new _usersController.default();
const usersAvatarController = new _usersAvatarController.default();
const upload = (0, _multer.default)(_upload.default);
usersRouter.get('/', userController.list);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), userController.create);
usersRouter.patch('/avatar', _isAuthenticated.default, upload.single('avatar'), usersAvatarController.updateAvatar);
var _default = usersRouter;
exports.default = _default;