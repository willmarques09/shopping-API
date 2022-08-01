"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _errors = _interopRequireDefault(require("../../errors"));

var _ICustomer = require("../../interface/ICustomer");

var _IOrder = require("../../interface/IOrder");

var _IProducts = require("../../interface/IProducts/IProducts");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrder.IOrdersRepository === "undefined" ? Object : _IOrder.IOrdersRepository, typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository, typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
  constructor(ordersRepository, customRepository, productRepository) {
    this.ordersRepository = ordersRepository;
    this.customRepository = customRepository;
    this.productRepository = productRepository;
  }

  async create({
    customer_id,
    products
  }) {
    // Verifica se existe um cliente
    const customerExists = await this.customRepository.findById(customer_id);

    if (!customerExists) {
      throw new _errors.default('Could not find any customer with the given id.');
    } // Verifica se existe algum produto


    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new _errors.default('Could not find any products with the given ids.');
    } // Pega os id que foram encontrados


    const existsProductsIds = existsProducts.map(product => product.id); // Verifica os produtos inexistentes

    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));

    if (checkInexistentProducts.length) {
      throw new _errors.default(`Could not find product ${checkInexistentProducts[0].id}.`);
    } // Pecorre cada produto e verifica se a quantidade que foi enviado é igual ao id que já existe,


    const quantityAvailable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity); // Se a quantidade comprada for maior que existe, então não pode vender o produto

    if (quantityAvailable.length) {
      throw new _errors.default(`The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`);
    } // Pega o preço da tabela, array com lista de produtos já montada, id, quantidade e preço


    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    })); // Passa os dados que precisa para criar o registro

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts
    });
    const {
      order_products
    } = order; // Faz um map de cada produto, e remove a quantidade que existe no banco de dados pela quantidade que o customer está comprando

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));
    await this.productRepository.updateStock(updatedProductQuantity);
    return order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateOrderService;
exports.default = _default;