import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (user) {
            return user;
        }
        throw new UnauthorizedException("Invalid credentials");
    }
    constructor(private authService: AuthService) { super({ usernameField: 'email' }); }
}
