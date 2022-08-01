"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductRepository = void 0;

var _typeorm = require("typeorm");

var _productsEntitie = _interopRequireDefault(require("../entities/productsEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ProductRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_productsEntitie.default);
  }

  async create({
    name,
    price,
    quantity
  }) {
    const product = this.ormRepository.create({
      name,
      price,
      quantity
    });
    await this.ormRepository.save(product);
    return product;
  }

  async save(product) {
    await this.ormRepository.save(product);
    return product;
  }

  async remove(product) {
    await this.ormRepository.remove(product);
  }

  async updateStock(products) {
    await this.ormRepository.save(products);
  }

  async findByName(name) {
    const product = this.ormRepository.findOne({
      name
    });
    return product;
  }

  async findById(id) {
    const product = this.ormRepository.findOne({
      id
    });
    return product;
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [products, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products
    };
    return result;
  }

  async findAllByIds(products) {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.ormRepository.find({
      where: {
        id: (0, _typeorm.In)(productIds)
      }
    });
    return existentProducts;
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


exports.ProductRepository = ProductRepository;