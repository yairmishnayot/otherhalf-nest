import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1705007453197 implements MigrationInterface {
  name = 'CreateUsersTable1705007453197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(70) NOT NULL, \`lastName\` varchar(70) NOT NULL, \`email\` varchar(70) NULL, \`phone\` varchar(20) NOT NULL, \`password\` varchar(100) NOT NULL, \`canManageMoreClients\` tinyint NOT NULL DEFAULT 1, \`picture\` text NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`isFirstLogin\` tinyint NOT NULL DEFAULT 0, \`status\` tinyint NOT NULL DEFAULT 1, \`lastLoggedAt\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`phone_index\` (\`phone\`), UNIQUE INDEX \`IDX_9117cd802f56e45adfaeb56743\` (\`email\`, \`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9117cd802f56e45adfaeb56743\` ON \`users\``,
    );
    await queryRunner.query(`DROP INDEX \`phone_index\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
