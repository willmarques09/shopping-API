import { Request, Response } from 'express';

import ShowProfileService from '../services/userService/showProfileService';
import UpdateProfileService from '../services/userService/updateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response) {
    const showProfile = new ShowProfileService();
    const user_id = req.user.id;

    const user = await showProfile.updateProfile({ user_id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(user);
  }
}
