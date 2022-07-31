import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '../services/userService/resetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.resetPassword({
      password,
      token,
    });

    return response.status(204).json();
  }
}
