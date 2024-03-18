import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class Tokens1710711897273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'token', type: 'text' },
          { name: 'type', type: 'varchar(191)' },
          { name: 'expiry', type: 'timestamp' },
          { name: 'payload', type: 'varchar(191)', isNullable: true },
          { name: 'userId', type: 'varchar(36)', isNullable: true },
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
      'tokens',
      new TableIndex({
        name: 'IDX_TOKENS_DELETED_AT',
        columnNames: ['deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'tokens',
      new TableIndex({
        name: 'IDX_TOKENS_ID_DELETED_AT',
        columnNames: ['id', 'deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'tokens',
      new TableIndex({
        name: 'IDX_TOKENS_USER_ID',
        columnNames: ['userId'],
      }),
    );

    queryRunner.clearSqlMemory();

    const foreignKey = new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('tokens', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
    await queryRunner.dropIndex('tokens', 'IDX_TOKENS_ID_DELETED_AT');
    await queryRunner.dropIndex('tokens', 'IDX_TOKENS_DELETED_AT');
    await queryRunner.dropIndex('tokens', 'IDX_TOKENS_USER_ID');
  }
}
