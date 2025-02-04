import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SessionController from '../../Controllers/SessionController.1';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
