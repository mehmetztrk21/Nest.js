import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from 'src/config/config.module';
import { CustomService } from './custom/custom.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CustomService],
  exports: [UsersService], //user servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
  imports: [ConfigModule.forRoot('prod')], //dinamik modül kullanımı
})
export class UsersModule {}
