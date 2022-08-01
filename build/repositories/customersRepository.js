"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomersRepository = void 0;

var _typeorm = require("typeorm");

var _customersEntitie = _interopRequireDefault(require("../entities/customersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CustomersRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_customersEntitie.default);
  }

  async create({
    name,
    email
  }) {
    const customer = this.ormRepository.create({
      name,
      email
    });
    await this.ormRepository.save(customer);
    return customer;
  }

  async save(customer) {
    await this.ormRepository.save(customer);
    return customer;
  }

  async remove(customer) {
    await this.ormRepository.remove(customer);
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      // limite por pag
      total: count,
      // total de dados
      current_page: page,
      // pag atual
      data: customers // dados do comprador

    };
    return result;
  }

  async findByName(name) {
    const customer = await this.ormRepository.findOne({
      name
    });
    return customer;
  }

  async findById(id) {
    const customer = await this.ormRepository.findOne({
      id
    });
    return customer;
  }

  async findByEmail(email) {
    const customer = await this.ormRepository.findOne({
      email
    });
    return customer;
  }

} // respositorio costumizado
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


exports.CustomersRepository = CustomersRepository;