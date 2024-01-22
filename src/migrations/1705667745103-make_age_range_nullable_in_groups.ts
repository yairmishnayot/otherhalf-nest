import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeAgeRangeNullableInGroups1705667745103
  implements MigrationInterface
{
  name = 'MakeAgeRangeNullableInGroups1705667745103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`groups\` CHANGE \`startAgeRange\` \`startAgeRange\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups\` CHANGE \`endAgeRange\` \`endAgeRange\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`groups\` CHANGE \`endAgeRange\` \`endAgeRange\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups\` CHANGE \`startAgeRange\` \`startAgeRange\` int NOT NULL`,
    );
  }
}
