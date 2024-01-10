import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCharactersLimitationOnStringFields1704870582402
  implements MigrationInterface
{
  name = 'UpdateCharactersLimitationOnStringFields1704870582402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`name\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`hebrewName\``);
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`hebrewName\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`name\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`cities\` ADD \`name\` varchar(70) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`cities\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`hebrewName\``);
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`hebrewName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`name\` varchar(255) NOT NULL`,
    );
  }
}
