import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReligionStylesTable1704871423182 implements MigrationInterface {
    name = 'CreateReligionStylesTable1704871423182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`religion-styles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(70) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`religion-styles\``);
    }

}
