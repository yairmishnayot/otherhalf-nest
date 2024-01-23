import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientEthnicitiesTable1705955743003
  implements MigrationInterface
{
  name = 'CreateClientEthnicitiesTable1705955743003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clients_ethnicities_ethnicities\` (\`clientsId\` int NOT NULL, \`ethnicitiesId\` int NOT NULL, INDEX \`IDX_9483cb6a7717a07bb4cc3ca294\` (\`clientsId\`), INDEX \`IDX_56e5123dc69e5f9f02513916e6\` (\`ethnicitiesId\`), PRIMARY KEY (\`clientsId\`, \`ethnicitiesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities_ethnicities\` ADD CONSTRAINT \`FK_9483cb6a7717a07bb4cc3ca294f\` FOREIGN KEY (\`clientsId\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities_ethnicities\` ADD CONSTRAINT \`FK_56e5123dc69e5f9f02513916e6e\` FOREIGN KEY (\`ethnicitiesId\`) REFERENCES \`ethnicities\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities_ethnicities\` DROP FOREIGN KEY \`FK_56e5123dc69e5f9f02513916e6e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities_ethnicities\` DROP FOREIGN KEY \`FK_9483cb6a7717a07bb4cc3ca294f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_56e5123dc69e5f9f02513916e6\` ON \`clients_ethnicities_ethnicities\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9483cb6a7717a07bb4cc3ca294\` ON \`clients_ethnicities_ethnicities\``,
    );
    await queryRunner.query(`DROP TABLE \`clients_ethnicities_ethnicities\``);
  }
}
