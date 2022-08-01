"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _forgotPasswordController = _interopRequireDefault(require("../../Controllers/forgotPasswordController"));

var _resetPasswordController = _interopRequireDefault(require("../../Controllers/resetPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRouter = (0, _express.Router)();
const forgotPasswordController = new _forgotPasswordController.default();
const resetPasswordController = new _resetPasswordController.default();
passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
}), resetPasswordController.create);
var _default = passwordRouter;
exports.default = _default;