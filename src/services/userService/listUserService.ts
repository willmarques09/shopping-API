import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../../repositories/UsersRepositoty';

class ListUserService {
  public async list() {
    const userRepository = getCustomRepository(UserRepository); // repositorio costumizado

    const users = await userRepository.find(); // lista todos os produtos

    return users;
  }
}
export default ListUserService;
