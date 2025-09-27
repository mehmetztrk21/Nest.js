import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/create.user.dto';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.userService.findOne(id);
    }
    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: Partial<CreateUserDto>,
    ): Promise<User> {
        return await this.userService.update(id, updateUserDto);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return await this.userService.remove(id);
    }
}
