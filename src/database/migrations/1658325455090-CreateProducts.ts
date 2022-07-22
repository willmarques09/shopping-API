import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// yarn typeorm migration:create -n CreateProducts para criar uma migration
// yarn typeorm migartion:run para rodar a migration
export class CreateProducts1658325455090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // chamada  createTable para criar uma tabela
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id', // criando coluna com no0me id
            type: 'uuid', // vai receber uuid
          },
          {
            name: 'name', // nome product
            type: 'varchar', // vai receber escrita letras/numeros
          },
          {
            name: 'price', // preço
            type: 'numeric', // number
          },
          {
            name: 'quantity', // quantidade
            type: 'numeric', // number
          },
          {
            name: 'created_at', // nome da  a coluna
            type: 'timestamp', // pq nao existe tipo date entao recebe timestamp ou uma DATA
            default: 'now()', // se nao for enviado nd recebe a data atual
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()', // se nao for enviado nd recebe a data atual
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
    // chamada para deletar a tabela
    // yarn typeorm migartion:revert para apagar a migration
  }
}
