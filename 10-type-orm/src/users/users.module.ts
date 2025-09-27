import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  //imports:[TypeOrmModule.forFeature([User])] // User entity'sini user modülünde kullanmak için kullanılır. Ama app modulde yüklersek tüm modüllerde kullanabiliriz
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
