import { MigrationInterface, QueryRunner } from "typeorm";

export class Set2PointsDecimalForClientHeight1719470904366 implements MigrationInterface {
    name = 'Set2PointsDecimalForClientHeight1719470904366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "height" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "height" TYPE numeric`);
    }

}
