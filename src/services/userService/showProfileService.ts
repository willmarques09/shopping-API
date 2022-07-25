import { getCustomRepository } from 'typeorm';

import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';

interface IResquest {
  user_id: string;
}
class ShowProfileService {
  public async updateProfile({ user_id }: IResquest) {
    const userRepository = getCustomRepository(UserRepository); // repositorio costumizado

    const user = await userRepository.findOne(user_id); // lista todos os produtos

    if (!user) {
      throw new AppError('Use not found');
    }
    return user;
  }
}
export default ShowProfileService;
