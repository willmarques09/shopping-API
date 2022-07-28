/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import OrdersProductEntitie from './ordersProductEntitie';

@Entity('products')
export default class ProductsEntitie {
  @PrimaryColumn()
  id: string;

  @OneToMany(
    () => OrdersProductEntitie,
    order_products => order_products.product,
  )
  order_products: OrdersProductEntitie[];

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
