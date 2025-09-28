import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3310,
  username: 'nestjs',
  password: 'nestjs',
  database: 'nestjs',
  synchronize: false, //migrations ile kullanıyorsak false olmalı
  logging: true,
  entities: [__dirname + '/**/*.entity*{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  migrationsRun: true,
});
