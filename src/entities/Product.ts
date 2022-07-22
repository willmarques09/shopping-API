import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('products') // incicializando uma entidade que recebe na migration, se comunica com banco de dados tipando
class Product {
  @PrimaryColumn() // id e uma chave primaria
  id: string;

  @Column() // nome e uma coluna tipado com string
  name: string;

  @Column() // price e uma coluna tipada como numero
  price: number;

  @Column() // quantity e uma coluna tipada como numero
  quantity: number;

  @CreateDateColumn() // CreateDateColumn tipa como data
  created_at: Date;

  @UpdateDateColumn() // UpdateDateColumn tipa como data
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid(); // gera um id primario
    }
  }
}

export default Product;
