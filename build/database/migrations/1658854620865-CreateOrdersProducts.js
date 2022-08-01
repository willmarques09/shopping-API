"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrdersProducts1658854620865 = void 0;

var _typeorm = require("typeorm");

class CreateOrdersProducts1658854620865 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'order_products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'price',
        type: 'numeric'
      }, {
        name: 'quantity',
        type: 'numeric'
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
    await queryRunner.dropTable('order_products');
  }

}

exports.CreateOrdersProducts1658854620865 = CreateOrdersProducts1658854620865;