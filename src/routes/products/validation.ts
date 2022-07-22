import { celebrate, Joi, Segments } from 'celebrate';

export const validationGetById = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(), // joi faz parte da documentacao, tipo string do tipo uuid obrigatoria
  },
});

export const validationPost = celebrate({
  // E passado no corpo da requisicao
  [Segments.BODY]: {
    name: Joi.string().required(), // nome e uma string obrigatoria
    price: Joi.number().required(), // price e um number obrigatorio
    quantity: Joi.number().required(), // quantity e um number obrigatorio
  },
});

export const validationPut = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(), // nome e uma string obrigatoria
    price: Joi.number().required(), // price e um number obrigatorio
    quantity: Joi.number().required(), // quantity e um number obrigatorio
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(), // E passado no corpo da requisicao, do tipo id joi string do tipo uuid obrigatorio
  },
});

export const validationDelete = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(), // E passado no corpo da requisicao, do tipo id joi string do tipo uuid obrigatorio
  },
});
