import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Roles1710698142485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar(191)' },
          { name: 'permissions', type: 'text' },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          { name: 'updatedAt', type: 'timestamp', isNullable: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'roles',
      new TableIndex({
        name: 'IDX_ROLES_DELETED_AT',
        columnNames: ['deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'roles',
      new TableIndex({
        name: 'IDX_ROLES_ID_DELETED_AT',
        columnNames: ['id', 'deletedAt'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
    await queryRunner.dropIndex('roles', 'IDX_ROLES_DELETED_AT');
    await queryRunner.dropIndex('roles', 'IDX_ROLES_ID_DELETED_AT');
  }
}
