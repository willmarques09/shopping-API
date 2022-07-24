import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import autConfig from '../../config/auth';
import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';

interface IRequest {
  // IResquest esta fazendo uma tipagem
  email: string;
  password: string;
}

class CreateSessionService {
  public async create({ email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError('incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password); // compara a senha do usuario com a senha criptografada

    if (!passwordConfirmed) {
      throw new AppError('incorrect email/password combination.', 401);
    }

    const token = sign({}, autConfig.jwt.secret, {
      subject: user.id,
      expiresIn: autConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
