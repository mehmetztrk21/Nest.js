import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { LocalAuthGuard } from './local-auth/local-auth.service';

@Module({
  providers: [AuthService, LocalStrategyService, LocalAuthGuard],
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule { }
