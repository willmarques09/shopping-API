import { getRepository, Repository } from 'typeorm';

import CustomersEntitie from '../entities/customersEntitie';
import {
  ICreateCustomer,
  ICustomersRepository,
  SearchParams,
} from '../interface/ICustomer';

export class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<CustomersEntitie>;

  constructor() {
    this.ormRepository = getRepository(CustomersEntitie);
  }

  public async create({ name, email }: ICreateCustomer) {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: CustomersEntitie) {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: CustomersEntitie) {
    await this.ormRepository.remove(customer);
  }

  public async findAll({ page, skip, take }: SearchParams) {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take, // limite por pag
      total: count, // total de dados
      current_page: page, // pag atual
      data: customers, // dados do comprador
    };

    return result;
  }

  public async findByName(name: string) {
    const customer = await this.ormRepository.findOne({
      name,
    });

    return customer;
  }

  public async findById(id: string) {
    const customer = await this.ormRepository.findOne({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string) {
    const customer = await this.ormRepository.findOne({
      email,
    });

    return customer;
  }
}

// respositorio costumizado

// entidade para ter acesso ao banco de dados e tipalas
// repositorio vai chamar para costumizar

/*
 banco de dados <=> DB postgres
 entidades <=> banco de dados  ----- entidade recebe informacoes do banco de dados e tipa
 repositorio <=> entidades     ----- recebe as tipagem da entidades e costumiza
 services <=> repositorio      ----- pega costumizacao e cria os serviços
 controler <=> services        ----- controle controla o servicos desda api e da comando aos usuario
 routes <=> controler          ----- rotas recebe informacao do controler
 index <=> routes              ----- index instancia as rotas
*/
