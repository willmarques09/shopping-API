import { inject, injectable } from 'tsyringe';

import AppError from '../../errors';
import { ICustomersRepository } from '../../interface/ICustomer';
import { IOrdersRepository } from '../../interface/IOrder';
import { IProductsRepository } from '../../interface/IProducts/IProducts';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  async create({ customer_id, products }: IRequest) {
    // Verifica se existe um cliente
    const customerExists = await this.customRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // Verifica se existe algum produto
    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    // Pega os id que foram encontrados
    const existsProductsIds = existsProducts.map(product => product.id);

    // Verifica os produtos inexistentes
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    // Pecorre cada produto e verifica se a quantidade que foi enviado é igual ao id que já existe,
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    // Se a quantidade comprada for maior que existe, então não pode vender o produto
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    // Pega o preço da tabela, array com lista de produtos já montada, id, quantidade e preço
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    // Passa os dados que precisa para criar o registro
    const order = this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    // Faz um map de cada produto, e remove a quantidade que existe no banco de dados pela quantidade que o customer está comprando
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
