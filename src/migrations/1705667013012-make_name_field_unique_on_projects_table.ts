import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeNameFieldUniqueOnProjectsTable1705667013012 implements MigrationInterface {
    name = 'MakeNameFieldUniqueOnProjectsTable1705667013012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ADD UNIQUE INDEX \`IDX_2187088ab5ef2a918473cb9900\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP INDEX \`IDX_2187088ab5ef2a918473cb9900\``);
    }

}
