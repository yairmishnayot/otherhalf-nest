import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersGroupsTable1705216185964 implements MigrationInterface {
  name = 'CreateUsersGroupsTable1705216185964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users_groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`role_id\` int NULL, \`group_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_0094842e56fac75a0aa0c41f9da\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_d665a3539878a2669c5ff26966c\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_d665a3539878a2669c5ff26966c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_0094842e56fac75a0aa0c41f9da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\``,
    );
    await queryRunner.query(`DROP TABLE \`users_groups\``);
  }
}
