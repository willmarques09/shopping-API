import { EntityRepository, Repository } from 'typeorm';

import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByName(name: string) {
    throw new Error('Method not implemented.');
  }
}
