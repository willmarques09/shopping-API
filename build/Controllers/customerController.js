"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerContoller = void 0;

var _tsyringe = require("tsyringe");

var _createCustomerService = _interopRequireDefault(require("../services/customers/createCustomerService"));

var _deleteCustomerService = _interopRequireDefault(require("../services/customers/deleteCustomerService"));

var _listCustomerService = _interopRequireDefault(require("../services/customers/listCustomerService"));

var _showCustomerService = _interopRequireDefault(require("../services/customers/showCustomerService"));

var _updateCustomerService = _interopRequireDefault(require("../services/customers/updateCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
// tipagem
class CustomerContoller {
  async list(req, res) {
    const listCustomers = _tsyringe.container.resolve(_listCustomerService.default);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const customer = await listCustomers.list({
      page,
      limit
    });
    return res.json(customer);
  }

  async listById(req, res) {
    const {
      id
    } = req.params; // base_url/products/:o ID que vc quer deletar

    const showCustomers = _tsyringe.container.resolve(_showCustomerService.default);

    const customer = await showCustomers.listById(id);
    return res.json(customer);
  }

  async create(req, res) {
    const {
      name,
      email
    } = req.body; // body e passado no corpo da requisiçao geramente com json

    const createCustomers = _tsyringe.container.resolve(_createCustomerService.default);

    const customer = await createCustomers.create({
      name,
      email
    });
    return res.json(customer); // se tudo tiver nos parametro cria se um produto
  }

  async update(req, res) {
    const {
      name,
      email
    } = req.body; // corpo da requisicao por json

    const {
      id
    } = req.params; // passado no parametro

    const updateCustomers = _tsyringe.container.resolve(_updateCustomerService.default);

    const customer = await updateCustomers.update({
      id,
      // onde id e passa no parametro
      name,
      // sao passado no corpo da requisicao sendo json
      email
    });
    return res.json(customer);
  }

  async delete(req, res) {
    const {
      id
    } = req.params; // base_url/products/:o ID que vc quer deletar

    const deleteCustomers = _tsyringe.container.resolve(_deleteCustomerService.default);

    await deleteCustomers.delete(id);
    return res.status(200).json({
      message: 'Customer removed successfully'
    });
  }

}

exports.CustomerContoller = CustomerContoller;