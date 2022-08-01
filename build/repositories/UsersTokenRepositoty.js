"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokenRepository = void 0;

var _typeorm = require("typeorm");

var _tokenEntitie = _interopRequireDefault(require("../entities/tokenEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UsersTokenRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_tokenEntitie.default);
  }

  async findByToken(token) {
    const userToken = await this.ormRepository.findOne({
      token
    });
    return userToken;
  }

  async generate(user_id) {
    const userToken = this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
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


exports.UsersTokenRepository = UsersTokenRepository;