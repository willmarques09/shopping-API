import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ForgotPasswordController from '../../Controllers/forgotPasswordController';
import ResetPasswordController from '../../Controllers/resetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
