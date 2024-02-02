import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeDeleteUserGroups1706881960740
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing foreign key constraint
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\`;`,
    );

    // Add a new foreign key constraint with ON DELETE CASCADE
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the cascading foreign key constraint
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\`;`,
    );

    // Re-add the original foreign key constraint without cascading deletes
    await queryRunner.query(
      `ALTER TABLE \`users_groups\` ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`);`,
    );
  }
}
