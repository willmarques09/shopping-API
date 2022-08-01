"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProductsController = require("../../Controllers/ProductsController");

var _validation = require("./validation");

const productsRouter = (0, _express.Router)();
const productsContoller = new _ProductsController.ProductsContoller();
productsRouter.get('/', productsContoller.list); // faz a listagem de todos os produtos

productsRouter.get('/:id', _validation.validationGetById, productsContoller.listById); // procura um produto pelo seu id

productsRouter.post('/', _validation.validationPost, productsContoller.create); // cria novos produtos

productsRouter.put('/:id', _validation.validationPut, productsContoller.update); // faz o update por id

productsRouter.delete('/:id', _validation.validationDelete, productsContoller.delete); // delete por id

var _default = productsRouter;
exports.default = _default;