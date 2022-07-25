import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';

interface IResquest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateProfileService {
  public async updateProfile({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IResquest) {
    const userRepository = getCustomRepository(UserRepository); // repositorio costumizado

    const user = await userRepository.findOne(user_id); // lista todos os produtos

    if (!user) {
      throw new AppError('Use not found');
    }

    const userUpdateEmail = await userRepository.findOne({ email });

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}
export default UpdateProfileService;
