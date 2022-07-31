/* eslint-disable import/no-extraneous-dependencies */
import { getRepository, Repository } from 'typeorm';

import TokenEntitie from '../entities/tokenEntitie';
import { IUserTokensRepository } from '../interface/IUserToken';

export class UsersTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<TokenEntitie>;

  constructor() {
    this.ormRepository = getRepository(TokenEntitie);
  }

  public async findByToken(token: string) {
    const userToken = await this.ormRepository.findOne({
      token,
    });

    return userToken;
  }

  public async generate(user_id: string) {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
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
