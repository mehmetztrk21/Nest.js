import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProduct1743873550728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //INSERT INTO `nestjs_db`.`product` (`title`, `desc`) VALUES ('qwe', 'qweqw');

    await queryRunner.query(
      "INSERT INTO product (`id`, `title`, `desc`) VALUES ('76b0c3a8-ca71-4a21-b4fe-240ff0ced2af', 'abc', 'descabc');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product`);
  }
}
