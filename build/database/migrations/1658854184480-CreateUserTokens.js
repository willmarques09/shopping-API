"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserTokens1658854184480 = void 0;

var _typeorm = require("typeorm");

class CreateUserTokens1658854184480 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tokens',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'token',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'user_id',
        // Será um chave estrangeira
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'tokenUser',
        // nome da foreign key
        referencedTableName: 'users',
        // Nome da tabela que receberá a chave primária (estrangeira)
        referencedColumnNames: ['id'],
        // Nome da coluna que irá referenciar, enviar o id para a outra coluna (estrangeira)
        columnNames: ['user_id'],
        // Nome da coluna que vai receber a Coluna da outra tabela
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tokens');
  }

}

exports.CreateUserTokens1658854184480 = CreateUserTokens1658854184480;