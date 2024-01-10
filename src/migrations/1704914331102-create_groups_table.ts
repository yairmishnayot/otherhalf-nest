import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGroupsTable1704914331102 implements MigrationInterface {
  name = ' createGroupsTable1704914331102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(70) NOT NULL, \`startAgeRange\` int NOT NULL, \`endAgeRange\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups\` ADD CONSTRAINT \`FK_987d2b8b4000bc4d5b377bfee65\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`groups\` DROP FOREIGN KEY \`FK_987d2b8b4000bc4d5b377bfee65\``,
    );
    await queryRunner.query(`DROP TABLE \`groups\``);
  }
}
