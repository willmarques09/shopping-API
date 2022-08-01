"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _customersEntitie = _interopRequireDefault(require("../../entities/customersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FakeCustomersRepository {
  constructor() {
    _defineProperty(this, "customers", [{
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Hello',
      email: 'hewwlo@gmail.com',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: '783a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Hello',
      email: 'hewwlo2@gmail.com',
      created_at: new Date(),
      updated_at: new Date()
    }]);
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

  async save(customer) {
    Object.assign(this.customers, customer);
    return customer;
  }

  async remove(dataRemoveCustomer) {}

  async findAll() {
    return undefined;
  }

  async findByName(name) {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  async findById(id) {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  async findByEmail(email) {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }

}

var _default = FakeCustomersRepository;
exports.default = _default;