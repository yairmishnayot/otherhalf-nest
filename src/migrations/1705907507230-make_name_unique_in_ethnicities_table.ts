import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeNameUniqueInEthnicitiesTable1705907507230
  implements MigrationInterface
{
  name = 'MakeNameUniqueInEthnicitiesTable1705907507230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ethnicities\` ADD UNIQUE INDEX \`IDX_435326939ecdcf919d7c8b5715\` (\`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ethnicities\` DROP INDEX \`IDX_435326939ecdcf919d7c8b5715\``,
    );
  }
}
