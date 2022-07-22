import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';

interface IRequest {
  name: string; // IResquest esta fazendo uma tipagem
  email: string;
  password: string;
}

class CreateUserService {
  public async create({ name, email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findOne({ email });
    if (emailExists) {
      throw new AppError('email address already used');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
