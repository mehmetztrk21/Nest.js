import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { LocalAuthGuard } from './local-auth/local-auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { JwtAuthGuard } from './jwt-auth-guard/jwt-auth-guard.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, LocalStrategyService, LocalAuthGuard, JwtStrategyService, JwtAuthGuard],
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({
    secret: 'mySecretKey',
    signOptions: { expiresIn: '60s' }
  })
  ],
})
export class AuthModule { }
