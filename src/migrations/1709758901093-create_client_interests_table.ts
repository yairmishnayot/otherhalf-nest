import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientInterestsTable1709758901093
  implements MigrationInterface
{
  name = 'CreateClientInterestsTable1709758901093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clients_interests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL DEFAULT '4', \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`client_id\` int NULL, \`intrested_in_client_id\` int NULL, UNIQUE INDEX \`IDX_ae9e3bd3b41340f9b244e09408\` (\`client_id\`, \`intrested_in_client_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_interests\` ADD CONSTRAINT \`FK_ebde295e0ae5a0327b89d3b25ba\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_interests\` ADD CONSTRAINT \`FK_15e1b463818c129aced1ea51240\` FOREIGN KEY (\`intrested_in_client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients_interests\` DROP FOREIGN KEY \`FK_15e1b463818c129aced1ea51240\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_interests\` DROP FOREIGN KEY \`FK_ebde295e0ae5a0327b89d3b25ba\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ae9e3bd3b41340f9b244e09408\` ON \`clients_interests\``,
    );
    await queryRunner.query(`DROP TABLE \`clients_interests\``);
  }
}
