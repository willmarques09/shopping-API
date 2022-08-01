"use strict";

var _tsyringe = require("tsyringe");

var _bcryptHash = _interopRequireDefault(require("../config/bcryptHash"));

var _customersRepository = require("../repositories/customersRepository");

var _ordersRepository = require("../repositories/ordersRepository");

var _ProductsRepository = require("../repositories/ProductsRepository");

var _UsersRepository = require("../repositories/UsersRepository");

var _UsersTokenRepositoty = require("../repositories/UsersTokenRepositoty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('CustomersRepository', _customersRepository.CustomersRepository);

_tsyringe.container.registerSingleton('ProductRepository', _ProductsRepository.ProductRepository);

_tsyringe.container.registerSingleton('OrdersRepository', _ordersRepository.OrdersRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.UserRepository);

_tsyringe.container.registerSingleton('UsersTokenRepository', _UsersTokenRepositoty.UsersTokenRepository);

_tsyringe.container.registerSingleton('HashProvider', _bcryptHash.default);