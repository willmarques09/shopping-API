import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../../config/upload';
import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';

interface IRequest {
  id: string; // IResquest esta fazendo uma tipagem
  avatar: string;
}

class UpdateUserAvatarService {
  public async updateAvatar({ id, avatar }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ id });

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatar;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
