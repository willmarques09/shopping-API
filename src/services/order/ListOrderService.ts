import { getCustomRepository, Repository } from 'typeorm';

import OrdersEntitie from '../../entities/orderEntitie';
import AppError from '../../errors';
import OrdersRepository from '../../repositories/ordersRepository';

class ListOrderService {
  private orderRepository: Repository<OrdersEntitie>;

  constructor() {
    this.orderRepository = getCustomRepository(OrdersRepository);
  }

  async list(id: string) {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ListOrderService;
