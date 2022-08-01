"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductsContoller = void 0;

var _tsyringe = require("tsyringe");

var _CreateProductsService = _interopRequireDefault(require("../services/productsService/CreateProductsService"));

var _DeleteProductService = _interopRequireDefault(require("../services/productsService/DeleteProductService"));

var _ListProductService = _interopRequireDefault(require("../services/productsService/ListProductService"));

var _ShowProductService = _interopRequireDefault(require("../services/productsService/ShowProductService"));

var _UpdateProductService = _interopRequireDefault(require("../services/productsService/UpdateProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
// tipagem
class ProductsContoller {
  async list(req, res) {
    const listProduct = _tsyringe.container.resolve(_ListProductService.default);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const product = await listProduct.list({
      page,
      limit
    });
    return res.json(product);
  }

  async listById(req, res) {
    const {
      id
    } = req.params; // base_url/products/:o ID que vc quer deletar

    const showProduct = _tsyringe.container.resolve(_ShowProductService.default);

    const product = await showProduct.listById(id);
    return res.json(product);
  }

  async create(req, res) {
    const {
      name,
      price,
      quantity
    } = req.body; // body e passado no corpo da requisiçao geramente com json

    const createProduct = _tsyringe.container.resolve(_CreateProductsService.default);

    const product = await createProduct.create({
      name,
      price,
      quantity
    });
    return res.json(product); // se tudo tiver nos parametro cria se um produto
  }

  async update(req, res) {
    const {
      name,
      price,
      quantity
    } = req.body; // corpo da requisicao por json

    const {
      id
    } = req.params; // passado no parametro

    const updateProduct = _tsyringe.container.resolve(_UpdateProductService.default);

    const product = await updateProduct.update({
      id,
      // onde id e passa no parametro
      name,
      // sao passado no corpo da requisicao sendo json
      price,
      // sao passado no corpo da requisicao sendo json
      quantity // sao passado no corpo da requisicao sendo json

    });
    return res.json(product);
  }

  async delete(req, res) {
    const {
      id
    } = req.params; // base_url/products/:o ID que vc quer deletar

    const deleteProduct = _tsyringe.container.resolve(_DeleteProductService.default);

    await deleteProduct.delete(id);
    return res.status(200).json({
      message: 'product removed successfully'
    });
  }

}

exports.ProductsContoller = ProductsContoller;