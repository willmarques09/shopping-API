"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _customers = _interopRequireDefault(require("./customer/customers.routes"));

var _order = _interopRequireDefault(require("./order"));

var _products = _interopRequireDefault(require("./products"));

var _users = _interopRequireDefault(require("./users"));

var _password = _interopRequireDefault(require("./users/password.routes"));

var _profile = _interopRequireDefault(require("./users/profile.routes"));

var _session = _interopRequireDefault(require("./users/session.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _session.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/customers', _customers.default);
routes.use('/orders', _order.default);
var _default = routes;
exports.default = _default;