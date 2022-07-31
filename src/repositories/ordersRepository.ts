/* eslint-disable import/no-extraneous-dependencies */
import { getRepository, Repository } from 'typeorm';

import OrdersEntitie from '../entities/orderEntitie';
import { ICreateOrder, IOrdersRepository } from '../interface/IOrder';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<OrdersEntitie>;

  constructor() {
    this.ormRepository = getRepository(OrdersEntitie);
  }

  public async findById(id: string) {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAll({ page, skip, take }: SearchParams) {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }

  public async create({ customer, products }: ICreateOrder) {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

/*
Repositories faz a comunicação entre a entidade e a tabela do banco de dados
representação e manipulação de dados
Para cada entidade criamos um repositório que será um classe que irá
representar a entidade dentro do banco de dados, faz a manipulação que for
necessário fazer
*/
