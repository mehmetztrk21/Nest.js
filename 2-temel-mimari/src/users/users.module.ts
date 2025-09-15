import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //user servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
})
export class UsersModule {}
