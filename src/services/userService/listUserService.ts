import { inject, injectable } from 'tsyringe';

import { ISearchParams } from '../../interface/ICustomer';
import { IUsersRepository } from '../../interface/IUsers';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const listUsers = await this.usersRepository.findAll({
      page,
      skip,
      take,
    });
    return listUsers;
  }
}
export default ListUserService;
