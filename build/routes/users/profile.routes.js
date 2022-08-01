"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _profileController = _interopRequireDefault(require("../../Controllers/profileController"));

var _isAuthenticated = _interopRequireDefault(require("./isAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _profileController.default();
profileRouter.use(_isAuthenticated.default);
profileRouter.get('/', _isAuthenticated.default, profileController.show);
profileRouter.put('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.string().optional(),
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password')).when('password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.required()
    })
  }
}), profileController.update);
var _default = profileRouter;
exports.default = _default;