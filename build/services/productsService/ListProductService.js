"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IProducts = require("../../interface/IProducts/IProducts");

var _dec, _dec2, _dec3, _dec4, _class;

let ListProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async list({
    page,
    limit
  }) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const listCustom = await this.productsRepository.findAll({
      page,
      skip,
      take
    });
    return listCustom;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProductService;
exports.default = _default;