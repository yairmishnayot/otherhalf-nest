import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueFieldsToTables implements MigrationInterface {
  name = 'AddUniqueFieldsToTables1705950199924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`groups\` ADD UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`religion-styles\` ADD UNIQUE INDEX \`IDX_596df9fc4b7a628879e95a2415\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b835c190939b0129d545a48a67\` ON \`clients\` (\`phone\`, \`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_b835c190939b0129d545a48a67\` ON \`clients\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`religion-styles\` DROP INDEX \`IDX_596df9fc4b7a628879e95a2415\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups\` DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\``,
    );
  }
}
