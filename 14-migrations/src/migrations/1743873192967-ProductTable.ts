import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTable1743873192967 implements MigrationInterface {
  name = 'ProductTable1743873192967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
