"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomers1658854310519 = void 0;

var _typeorm = require("typeorm");

class CreateCustomers1658854310519 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'customers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('customers');
  }

}

exports.CreateCustomers1658854310519 = CreateCustomers1658854310519;