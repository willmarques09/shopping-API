import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../services/userService/createUserService';
import ListUserService from '../services/userService/listUserService';

export default class UsersController {
  public async list(req: Request, res: Response) {
    const listUser = container.resolve(ListUserService);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const list = await listUser.list({ page, limit });

    return res.json(list);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
