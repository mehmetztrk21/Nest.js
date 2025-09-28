import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() body: Partial<User>): Promise<User> {
        const { name, email, profile } = body;
        return this.userService.createUser({ name, email, profile });
    }

    @Post('repo')
    async createUserWithRepo(@Body() body: Partial<User>): Promise<User> {
        const { name, email, profile } = body;
        return this.userService.createUserWithRepo({ name, email, profile });
    }
}
