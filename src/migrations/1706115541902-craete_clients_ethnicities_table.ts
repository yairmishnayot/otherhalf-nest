import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsEthnicitiesTable1706115541902
  implements MigrationInterface
{
  name = 'CreateClientsEthnicitiesTable1706115541902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clients_ethnicities\` (\`client_id\` int NOT NULL, \`ethnicity_id\` int NOT NULL, INDEX \`IDX_6216b22b4fbb4686002a523c22\` (\`client_id\`), INDEX \`IDX_34acd5388debaff36b643d84f4\` (\`ethnicity_id\`), PRIMARY KEY (\`client_id\`, \`ethnicity_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities\` ADD CONSTRAINT \`FK_6216b22b4fbb4686002a523c224\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities\` ADD CONSTRAINT \`FK_34acd5388debaff36b643d84f48\` FOREIGN KEY (\`ethnicity_id\`) REFERENCES \`ethnicities\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities\` DROP FOREIGN KEY \`FK_34acd5388debaff36b643d84f48\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients_ethnicities\` DROP FOREIGN KEY \`FK_6216b22b4fbb4686002a523c224\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_34acd5388debaff36b643d84f4\` ON \`clients_ethnicities\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6216b22b4fbb4686002a523c22\` ON \`clients_ethnicities\``,
    );
    await queryRunner.query(`DROP TABLE \`clients_ethnicities\``);
  }
}
