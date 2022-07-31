import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { IHashProvider } from '../../interface/IHash';
import { ICreateUser, IUsersRepository } from '../../interface/IUsers';
import { UserRepository } from '../../repositories/UsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async create({ name, email, password }: ICreateUser) {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('email address already used');
    }

    const hashedPassword = await hash(password, 8); // criar criptografia para senha

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
