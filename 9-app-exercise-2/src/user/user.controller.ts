import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create.user.dto';
import type { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createUser(@Body() createUserDto: CreateUserDto): any {
        const { name, email, age } = createUserDto;
        const newUser = this.userService.createUser(name, email, age);
        return {
            message: 'User created successfully',
            user: newUser,
        };
    }

    @Get()
    getAllUsers(): any {
        const users = this.userService.getAllUsers();
        return {
            message: 'All users retrieved successfully',
            users,
        };
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number, @Res() res: Response): any {
        const user = this.userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'User retrieved successfully',
            user,
        });
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): any {
        const isDeleted = this.userService.deleteUser(id);
        if (!isDeleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto, @Res() res: Response): any {
        const { name, email, age } = updateUserDto;
        const updatedUser = this.userService.updateUser(id, name, email, age);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    }
}
