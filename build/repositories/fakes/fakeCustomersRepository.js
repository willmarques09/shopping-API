"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _customersEntitie = _interopRequireDefault(require("../../entities/customersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FakeCustom {
  constructor() {
    _defineProperty(this, "customers", []);
  }

  async create({
    name,
    email
  }) {
    const customer = new _customersEntitie.default();
    customer.id = (0, _uuid.v4)();
    customer.name = name;
    customer.email = email;
    this.customers.push(customer);
    return customer;
  }

}

exports.default = FakeCustom;