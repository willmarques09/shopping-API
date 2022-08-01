"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdersControllers = void 0;

var _tsyringe = require("tsyringe");

var _createOrderService = _interopRequireDefault(require("../services/order/createOrderService"));

var _ListOrderService = _interopRequireDefault(require("../services/order/ListOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersControllers {
  async list(req, res) {
    const messageService = _tsyringe.container.resolve(_ListOrderService.default);

    const {
      id
    } = req.params;
    const products = await messageService.list(id);
    return res.status(200).json(products);
  }

  async create(req, res) {
    const messageService = _tsyringe.container.resolve(_createOrderService.default);

    const {
      customer_id,
      products
    } = req.body;
    const createProduct = await messageService.create({
      customer_id,
      products
    });
    return res.status(201).json(createProduct);
  }

}
/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/


exports.OrdersControllers = OrdersControllers;