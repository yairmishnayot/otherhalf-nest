import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRefreshTokensTable1708203163206
  implements MigrationInterface
{
  name = ' createRefreshTokensTable1708203163206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` text NOT NULL, \`expiryDate\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_3ddc983c5f7bcf132fd8732c3f\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`isFirstLogin\` \`isFirstLogin\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`isFirstLogin\` \`isFirstLogin\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3ddc983c5f7bcf132fd8732c3f\` ON \`refresh_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
