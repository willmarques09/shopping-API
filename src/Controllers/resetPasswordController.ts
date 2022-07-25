import { Request, Response } from 'express';

import ResetPasswordService from '../services/userService/resetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.create({
      password,
      token,
    });

    return response.status(204).json();
  }
}
