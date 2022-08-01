"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _orderControllers = require("../../Controllers/orderControllers");

var _isAuthenticated = _interopRequireDefault(require("../users/isAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersController = new _orderControllers.OrdersControllers();
const ordersRouter = (0, _express.Router)();
ordersRouter.use(_isAuthenticated.default);
ordersRouter.get('/:id', ordersController.list);
ordersRouter.post('/', ordersController.create);
var _default = ordersRouter;
/* put --- muda tudo
  patch --- muda alguns arquivos
*/

exports.default = _default;