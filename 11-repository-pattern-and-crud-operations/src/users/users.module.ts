import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { msyqlProvider } from 'src/database/database.provider';

@Module({
  //imports:[TypeOrmModule.forFeature([User])] // User entity'sini user modülünde kullanmak için kullanılır. Ama app modulde yüklersek tüm modüllerde kullanabiliriz
  providers: [UsersService, msyqlProvider],
  controllers: [UsersController],
})
export class UsersModule {}
