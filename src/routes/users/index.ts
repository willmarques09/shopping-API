import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../config/upload';
import UsersAvatarController from '../../Controllers/usersAvatarController';
import UsersController from '../../Controllers/usersController';
import isAuthenticated from './isAuthenticated';

const usersRouter = Router();
const userController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

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
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default usersRouter;
