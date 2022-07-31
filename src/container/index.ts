import { container } from 'tsyringe';

import BcryptHashProvider from '../config/bcryptHash';
import { ICustomersRepository } from '../interface/ICustomer';
import { IHashProvider } from '../interface/IHash';
import { IOrdersRepository } from '../interface/IOrder';
import { IProductsRepository } from '../interface/IProducts/IProducts';
import { IUsersRepository } from '../interface/IUsers';
import { IUserTokensRepository } from '../interface/IUserToken';
import { CustomersRepository } from '../repositories/customersRepository';
import { OrdersRepository } from '../repositories/ordersRepository';
import { ProductRepository } from '../repositories/ProductsRepository';
import { UserRepository } from '../repositories/UsersRepository';
import { UsersTokenRepository } from '../repositories/UsersTokenRepositoty';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokenRepository',
  UsersTokenRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
