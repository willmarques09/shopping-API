"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPut = exports.validationPost = exports.validationGetById = exports.validationDelete = void 0;

var _celebrate = require("celebrate");

const validationGetById = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required() // joi faz parte da documentacao, tipo string do tipo uuid obrigatoria

  }
});
exports.validationGetById = validationGetById;
const validationPost = (0, _celebrate.celebrate)({
  // E passado no corpo da requisicao
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    // nome e uma string obrigatoria
    price: _celebrate.Joi.number().required(),
    // price e um number obrigatorio
    quantity: _celebrate.Joi.number().required() // quantity e um number obrigatorio

  }
});
exports.validationPost = validationPost;
const validationPut = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    // nome e uma string obrigatoria
    price: _celebrate.Joi.number().required(),
    // price e um number obrigatorio
    quantity: _celebrate.Joi.number().required() // quantity e um number obrigatorio

  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required() // E passado no corpo da requisicao, do tipo id joi string do tipo uuid obrigatorio

  }
});
exports.validationPut = validationPut;
const validationDelete = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required() // E passado no corpo da requisicao, do tipo id joi string do tipo uuid obrigatorio

  }
});
exports.validationDelete = validationDelete;