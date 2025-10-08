import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth/local-auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body('email') email: string, @Body('password') password: string, @Res() response) {
        var user = await this.authService.validateUser(email, password);
        if (user) {
            return response.status(200).json(user);
        } else {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
    }
}
