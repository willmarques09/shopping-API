import { Request, Response } from 'express';

import CreateUserService from '../services/userService/createUserService';
import ListUserService from '../services/userService/listUserService';

export default class UsersController {
  public async list(req: Request, res: Response) {
    const listUser = new ListUserService();

    const users = await listUser.list();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
