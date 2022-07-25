import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';
import UsersTokenRepository from '../../repositories/UsersTokenRepositoty';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async create({ token, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRespository = getCustomRepository(UsersTokenRepository);

    const userToken = await userTokenRespository.findOne({ token });

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await userRepository.findOne(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}

export default ResetPasswordService;
