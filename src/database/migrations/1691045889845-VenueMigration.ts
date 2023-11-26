import { BASE_COLUMNS, TABLES } from 'src/common/constants';
import { VenueStatusEnum } from 'src/venue/enums/venue.enum';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class VenueMigration1691045889845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLES.venue,
        columns: [
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'province',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(VenueStatusEnum),
          },
          {
            name: 'imageList',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'openAt',
            type: 'varchar',
          },
          {
            name: 'closeAt',
            type: 'varchar',
          },
          {
            name: 'slug',
            type: 'varchar',
          },
          ...BASE_COLUMNS,
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      TABLES.venue,
      new TableIndex({
        name: 'venueName-idx',
        columnNames: ['name'],
      }),
    );
    await queryRunner.createIndex(
      TABLES.venue,
      new TableIndex({
        name: 'address-idx',
        columnNames: ['address'],
      }),
    );
    await queryRunner.createIndex(
      TABLES.venue,
      new TableIndex({
        name: 'province-idx',
        columnNames: ['province'],
      }),
    );
    await queryRunner.createIndex(
      TABLES.venue,
      new TableIndex({
        name: 'district-idx',
        columnNames: ['district'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(TABLES.venue, 'venueName-idx');
    await queryRunner.dropIndex(TABLES.venue, 'address-idx');
    await queryRunner.dropIndex(TABLES.venue, 'province-idx');
    await queryRunner.dropIndex(TABLES.venue, 'district-idx');
    await queryRunner.dropTable(TABLES.venue);
  }
}
