import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadingDeleteToUserGroups1733373440866
  implements MigrationInterface
{
  name = 'AddCascadingDeleteToUserGroups1733373440866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_groups" DROP CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups" ADD CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
