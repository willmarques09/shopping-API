"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _errors = _interopRequireDefault(require("../../errors"));

var _ICustomer = require("../../interface/ICustomer");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCustomerService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async create({
    name,
    email
  }) {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new _errors.default('email address already used');
    }

    const customer = await this.customersRepository.create({
      name,
      email
    });
    return customer;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateCustomerService;
exports.default = _default;