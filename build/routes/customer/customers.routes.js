"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _customerController = require("../../Controllers/customerController");

const customersRouter = (0, _express.Router)();
const customersContoller = new _customerController.CustomerContoller();
customersRouter.get('/', customersContoller.list); // faz a listagem de todos os produtos

customersRouter.get('/:id', customersContoller.listById); // procura um produto pelo seu id

customersRouter.post('/', customersContoller.create); // cria novos produtos

customersRouter.put('/:id', customersContoller.update); // faz o update por id

customersRouter.delete('/:id', customersContoller.delete); // delete por id

var _default = customersRouter;
exports.default = _default;