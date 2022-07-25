import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/userService/sendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.create({
      email,
    });

    return res.status(204).json();
  }
}
