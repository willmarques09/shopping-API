import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import autConfig from '../../config/auth';
import AppError from '../../errors';
import { IHashProvider } from '../../interface/IHash';
import { IUsersRepository } from '../../interface/IUsers';
import { ISession } from '../../interface/IUserToken';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async create({ email, password }: ISession) {
    const user = await this.usersRepository.findByEmail(email);

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
