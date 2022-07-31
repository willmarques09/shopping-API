import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { IOrdersRepository } from '../../interface/IOrder';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async list(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ListOrderService;
