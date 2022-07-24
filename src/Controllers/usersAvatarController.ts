import { Request, Response } from 'express';

import UpdateUserAvatarService from '../services/userService/updateUserAvatarService';

export default class UsersAvatarController {
  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename,
    });
    return res.json(user);
  }
}
