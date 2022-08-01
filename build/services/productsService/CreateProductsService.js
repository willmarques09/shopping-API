"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _errors = _interopRequireDefault(require("../../errors"));

var _IProducts = require("../../interface/IProducts/IProducts");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async create({
    name,
    price,
    quantity
  }) {
    const productExists = await this.productsRepository.findByName(name); // this serve para chamat o constructor

    if (productExists) {
      throw new _errors.default('there is already one product with this name', 409);
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity
    });
    return product;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateProductService;
exports.default = _default;