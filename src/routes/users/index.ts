import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../../Controllers/usersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/', userController.list);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default usersRouter;
