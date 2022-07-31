import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IUsersRepository } from '../../interface/IUsers';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async showProfile(id: string) {
    const usersExists = await this.usersRepository.findById(id);

    if (!usersExists) {
      throw new AppError('User not found', 404);
    }

    return usersExists;
  }
}
export default ShowProfileService;
