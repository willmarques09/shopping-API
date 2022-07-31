import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '../services/userService/createSessionService';

export default class SessionController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const user = await createSession.create({
      email,
      password,
    });
    return res.json(user);
  }
}
