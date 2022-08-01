import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IHashProvider } from '../../interface/IHash';
import { ICreateUser, IUsersRepository } from '../../interface/IUsers';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async create({ name, email, password }: ICreateUser) {
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password); // criar criptografia para senha

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
