import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() request) {
        return request.user;
    }

}
