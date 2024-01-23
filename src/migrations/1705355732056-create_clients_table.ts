import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1705355732056 implements MigrationInterface {
  name = 'CreateClientsTable1705355732056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` char(50) NOT NULL, \`lastName\` char(50) NOT NULL, \`email\` char(100) NOT NULL, \`phone\` char(17) NOT NULL, \`gender\` enum ('1', '2') NOT NULL, \`relationshipStatus\` enum ('1', '2', '3') NOT NULL, \`amountOfKids\` int NOT NULL DEFAULT '0', \`relationshipGoal\` enum ('1', '2', '3') NOT NULL, \`customEthnicity\` varchar(255) NULL, \`birthDate\` date NOT NULL, \`age\` int NOT NULL, \`height\` decimal NOT NULL, \`shabbathKosher\` enum ('1', '2', '3') NOT NULL, \`customReligionStyle\` char(100) NULL, \`family\` varchar(255) NOT NULL, \`service\` varchar(255) NOT NULL, \`education\` text NULL, \`currentlyDoing\` text NOT NULL, \`aboutMe\` text NOT NULL, \`lookingFor\` text NOT NULL, \`startAgeRangeSearch\` int NOT NULL, \`endAgeRangeSearch\` int NOT NULL, \`hasDisability\` tinyint NOT NULL DEFAULT 0, \`disabilityDetails\` varchar(255) NULL, \`moreDetails\` varchar(255) NULL, \`doesDateDivorced\` tinyint NOT NULL DEFAULT 0, \`doesShomerNegia\` enum ('1', '2', '3') NOT NULL, \`shmiratNegiaDetails\` varchar(255) NULL, \`doesSmoke\` tinyint NULL, \`doesWantAdvertisement\` tinyint NOT NULL, \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`group_id\` int NULL, \`user_id\` int NULL, \`city_id\` int NULL, \`religion_style_id\` int NULL, UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), UNIQUE INDEX \`IDX_aa22377d7d3e794ae4cd39cd9e\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_7a10e2319a4565e0308dd1d369c\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_07a7a09b04e7b035c9d90cf4984\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_3084792e7b6a3487cfafda08873\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_d4bbe76d7a3a9911825df5f09c1\` FOREIGN KEY (\`religion_style_id\`) REFERENCES \`religion-styles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_d4bbe76d7a3a9911825df5f09c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_3084792e7b6a3487cfafda08873\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_07a7a09b04e7b035c9d90cf4984\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_7a10e2319a4565e0308dd1d369c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_aa22377d7d3e794ae4cd39cd9e\` ON \`clients\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``,
    );
    await queryRunner.query(`DROP TABLE \`clients\``);
  }
}
