import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth/local-auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService, private jwtService: JwtService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body('email') email: string, @Res() response) {
        var user = await this.userService.findByEmail(email);
        if (user) {
            return response.status(200).json(user);
        } else {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
    }

    @Post('login-jwt')
    @UseGuards(LocalAuthGuard)
    async loginJwt(@Body('email') email: string, @Res() response) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const token = this.jwtService.sign({ email: user.email, sub: user.userId });
            return response.status(200).json({ access_token: token });
        } else {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
    }
}
