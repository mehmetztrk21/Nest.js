import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestTable1743873254740 implements MigrationInterface {
  name = 'TestTable1743873254740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`test\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`test\``);
  }
}
