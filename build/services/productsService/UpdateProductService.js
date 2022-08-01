"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _errors = _interopRequireDefault(require("../../errors"));

var _IProducts = require("../../interface/IProducts/IProducts");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tsyringe.injectable)();
let UpdateProductService = (_dec = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async update({
    id,
    name,
    price,
    quantity
  }) {
    const product = await this.productsRepository.findById(id);
    const productExists = await this.productsRepository.findByName(name);

    if (!product) {
      throw new _errors.default('product not found', 404);
    }

    if (productExists && product.name !== name) {
      throw new _errors.default('there is already one product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await this.productsRepository.save(product);
    return product;
  }

}) || _class) || _class) || _class);
var _default = UpdateProductService;
exports.default = _default;