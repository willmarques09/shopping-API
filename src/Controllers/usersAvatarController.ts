import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../services/userService/updateUserAvatarService';

export default class UsersAvatarController {
  public async updateAvatar(req: Request, res: Response) {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename,
    });
    return res.json(user);
  }
}
