import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { UserStatusType } from '@modules/users/users.constants';

export class Users1710687494493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'firstName', type: 'varchar(188)', isNullable: true },
          { name: 'lastName', type: 'varchar(188)', isNullable: true },
          { name: 'email', type: 'varchar(188)' },
          { name: 'password', type: 'varchar(191)' },
          { name: 'status', type: 'enum', enum: Object.values(UserStatusType) },
          { name: 'roleId', type: 'varchar(188)' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          { name: 'updatedAt', type: 'timestamp', isNullable: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_DELETED_AT',
        columnNames: ['deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_ID_DELETED_AT',
        columnNames: ['id', 'deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_FIRST_NAME_LAST_NAME_EMAIL_ROLE_STATUS_DELETED_AT',
        columnNames: ['firstName', 'lastName', 'email', 'roleId', 'status', 'deletedAt'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_ROLE_ID',
        columnNames: ['roleId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropIndex('users', 'IDX_USERS_DELETED_AT');
    await queryRunner.dropIndex('users', 'IDX_USERS_ID_DELETED_AT');
    await queryRunner.dropIndex('users', 'IDX_USERS_FIRST_NAME_LAST_NAME_EMAIL_ROLE_STATUS_DELETED_AT');
    await queryRunner.dropIndex('users', 'IDX_USERS_ROLE_ID');
  }
}
