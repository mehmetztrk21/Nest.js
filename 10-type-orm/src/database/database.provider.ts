import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const msyqlProvider = {
    provide: 'MYSQL_CONNECTION',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3310,
            username: 'nestjs',
            password: 'nestjs',
            database: 'nestjs',
            // entities: [__dirname + '/**/*.entity{.ts,.js}'], // entitylerin yolu
            entities: [User, Product], // entitylerin yolu
            migrations: [__dirname + '/migrations/*{.ts,.js}'], // migration dosyalarının yolu
            migrationsRun: true, // uygulama başlatıldığında migrationları çalıştır
            synchronize: true, // true yaparsak entityler otomatik tabloya çevrilir
            connectTimeout: 10000, // bağlantı zaman aşımı süresi
            debug: false, // debug modu
            logger: 'simple-console', // loglama türü (simple-console: konsola basar, advanced-console: daha detaylı loglama yapar)
            poolSize: 10, // bağlantı havuzu boyutu
            supportBigNumbers: true, // büyük sayıları destekle
            bigNumberStrings: false, // büyük sayıları string olarak döndürme
            logging: true, // loglama (true: tüm logları göster, false: hiç log gösterme, ['query', 'error']: sadece query ve error loglarını gösterme gibi özelleştirilebilir
        });
        return dataSource.initialize();
    },
};

// export const postgresProvider = {
//   provide: 'POSTGRES_CONNECTION',
//   useFactory: async () => {
//     const dataSource = new DataSource({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'nestjs',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'], // entitylerin yolu
//       migrations: [__dirname + '/migrations/*{.ts,.js}'], // migration dosyalarının yolu
//       migrationsRun: true, // uygulama başlatıldığında migrationları çalıştır
//       synchronize: true, // true yaparsak entityler otomatik tabloya çevrilir
//       logger: 'simple-console', // loglama türü (simple-console: konsola basar, advanced-console: daha detaylı loglama yapar)
//       poolSize: 10, // bağlantı havuzu boyutu
//       logging: true, // loglama (true: tüm logları göster, false: hiç log gösterme, ['query', 'error']: sadece query ve error loglarını gösterme gibi özelleştirilebilir
//     });
//     return dataSource.initialize();
//   },
// };
