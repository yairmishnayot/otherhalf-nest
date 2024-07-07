import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInterestLinksTable1720329352979 implements MigrationInterface {
    name = 'CreateInterestLinksTable1720329352979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interest_links" ("id" SERIAL NOT NULL, "link" character varying NOT NULL, "clientId" integer, CONSTRAINT "UQ_9277114f3e5aca23469f9acc37f" UNIQUE ("link"), CONSTRAINT "REL_9d877c3987ecab601eccc52ae2" UNIQUE ("clientId"), CONSTRAINT "PK_29c5efe1a3a16ca2e7f7876bdbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "interest_links" ADD CONSTRAINT "FK_9d877c3987ecab601eccc52ae2f" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interest_links" DROP CONSTRAINT "FK_9d877c3987ecab601eccc52ae2f"`);
        await queryRunner.query(`DROP TABLE "interest_links"`);
    }

}
