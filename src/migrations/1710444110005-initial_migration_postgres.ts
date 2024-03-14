import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigrationPostgres1710444110005
  implements MigrationInterface
{
  name = 'InitialMigrationPostgres1710444110005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "hebrewName" character varying(100) NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying(70) NOT NULL, "startAgeRange" integer, "endAgeRange" integer, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_groups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "user_id" integer, "role_id" integer, "group_id" integer, CONSTRAINT "PK_4644edf515e3c0b88e988522588" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, "expiryDate" TIMESTAMP, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_3ddc983c5f7bcf132fd8732c3f" UNIQUE ("user_id"), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(70) NOT NULL, "lastName" character varying(70) NOT NULL, "email" character varying(70), "phone" character varying(20) NOT NULL, "password" character varying(100) NOT NULL, "canManageMoreClients" boolean NOT NULL DEFAULT true, "picture" text, "isAdmin" boolean NOT NULL DEFAULT false, "isFirstLogin" boolean NOT NULL DEFAULT true, "status" boolean NOT NULL DEFAULT true, "lastLoggedAt" TIMESTAMP(0), "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_9117cd802f56e45adfaeb567438" UNIQUE ("email", "phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "phone_index" ON "users" ("phone") `);
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying(70) NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_a0ae8d83b7d32359578c486e7f6" UNIQUE ("name"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "religion-styles" ("id" SERIAL NOT NULL, "name" character varying(70) NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_596df9fc4b7a628879e95a2415c" UNIQUE ("name"), CONSTRAINT "PK_589b5d4769aa0a164e05bb92b33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ethnicities" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_435326939ecdcf919d7c8b57152" UNIQUE ("name"), CONSTRAINT "PK_bc24d46b41d1e3d153890c4381e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_gender_enum" AS ENUM('1', '2')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_relationshipstatus_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_relationshipgoal_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_shabbathkosher_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_doesshomernegia_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clients_status_enum" AS ENUM('0', '1', '2', '3', '4')`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "firstName" character(50) NOT NULL, "lastName" character(50) NOT NULL, "email" character(100) NOT NULL, "phone" character(17) NOT NULL, "gender" "public"."clients_gender_enum" NOT NULL, "relationshipStatus" "public"."clients_relationshipstatus_enum" NOT NULL, "amountOfKids" integer NOT NULL DEFAULT '0', "relationshipGoal" "public"."clients_relationshipgoal_enum" NOT NULL, "customEthnicity" character varying, "birthDate" date NOT NULL, "age" integer NOT NULL, "height" numeric NOT NULL, "shabbathKosher" "public"."clients_shabbathkosher_enum" NOT NULL, "customReligionStyle" character(100), "family" character varying NOT NULL, "service" character varying NOT NULL, "education" text, "currentlyDoing" text NOT NULL, "aboutMe" text NOT NULL, "lookingFor" text NOT NULL, "startAgeRangeSearch" integer NOT NULL, "endAgeRangeSearch" integer NOT NULL, "hasDisability" boolean NOT NULL DEFAULT false, "disabilityDetails" character varying, "moreDetails" character varying, "doesDateDivorced" boolean NOT NULL DEFAULT false, "doesShomerNegia" "public"."clients_doesshomernegia_enum" NOT NULL, "shmiratNegiaDetails" character varying, "doesSmoke" boolean, "doesWantAdvertisement" boolean NOT NULL, "status" "public"."clients_status_enum" NOT NULL DEFAULT '1', "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "group_id" integer, "user_id" integer, "city_id" integer, "religion_style_id" integer, CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_aa22377d7d3e794ae4cd39cd9e5" UNIQUE ("phone"), CONSTRAINT "UQ_b835c190939b0129d545a48a677" UNIQUE ("phone", "email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients_interests" ("id" SERIAL NOT NULL, "status" integer NOT NULL DEFAULT '4', "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "client_id" integer, "intrested_in_client_id" integer, CONSTRAINT "UQ_ae9e3bd3b41340f9b244e094085" UNIQUE ("client_id", "intrested_in_client_id"), CONSTRAINT "PK_f484ce6a64ae564e815e83d1ce3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients_ethnicities" ("client_id" integer NOT NULL, "ethnicity_id" integer NOT NULL, CONSTRAINT "PK_d459c45c9c8e31808f8bf0b2ae5" PRIMARY KEY ("client_id", "ethnicity_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6216b22b4fbb4686002a523c22" ON "clients_ethnicities" ("client_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_34acd5388debaff36b643d84f4" ON "clients_ethnicities" ("ethnicity_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_987d2b8b4000bc4d5b377bfee65" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_0094842e56fac75a0aa0c41f9da" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_d665a3539878a2669c5ff26966c" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_7a10e2319a4565e0308dd1d369c" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_3084792e7b6a3487cfafda08873" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_d4bbe76d7a3a9911825df5f09c1" FOREIGN KEY ("religion_style_id") REFERENCES "religion-styles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_interests" ADD CONSTRAINT "FK_ebde295e0ae5a0327b89d3b25ba" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_interests" ADD CONSTRAINT "FK_15e1b463818c129aced1ea51240" FOREIGN KEY ("intrested_in_client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_ethnicities" ADD CONSTRAINT "FK_6216b22b4fbb4686002a523c224" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_ethnicities" ADD CONSTRAINT "FK_34acd5388debaff36b643d84f48" FOREIGN KEY ("ethnicity_id") REFERENCES "ethnicities"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients_ethnicities" DROP CONSTRAINT "FK_34acd5388debaff36b643d84f48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_ethnicities" DROP CONSTRAINT "FK_6216b22b4fbb4686002a523c224"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_interests" DROP CONSTRAINT "FK_15e1b463818c129aced1ea51240"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_interests" DROP CONSTRAINT "FK_ebde295e0ae5a0327b89d3b25ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_d4bbe76d7a3a9911825df5f09c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_3084792e7b6a3487cfafda08873"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_7a10e2319a4565e0308dd1d369c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_d665a3539878a2669c5ff26966c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_0094842e56fac75a0aa0c41f9da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_987d2b8b4000bc4d5b377bfee65"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_34acd5388debaff36b643d84f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6216b22b4fbb4686002a523c22"`,
    );
    await queryRunner.query(`DROP TABLE "clients_ethnicities"`);
    await queryRunner.query(`DROP TABLE "clients_interests"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TYPE "public"."clients_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."clients_doesshomernegia_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clients_shabbathkosher_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."clients_relationshipgoal_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."clients_relationshipstatus_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clients_gender_enum"`);
    await queryRunner.query(`DROP TABLE "ethnicities"`);
    await queryRunner.query(`DROP TABLE "religion-styles"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP INDEX "public"."phone_index"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "users_groups"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
