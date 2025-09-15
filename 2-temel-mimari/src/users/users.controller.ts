import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get() // http://localhost:3000/users
  test() {
    this.usersService.testConfig();
    return 'get user endpoint';
  }

  @Get(':id') // http://localhost:3000/users/1
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post() // http://localhost:3000/users
  createUser() {
    return 'create user endpoint';
  }

  @Put(':id') // http://localhost:3000/users/1
  updateUser(@Param('id') id: string) {
    return `update user endpoint for user ${id}`;
  }

  @Delete(':id') // http://localhost:3000/users/1
  deleteUser(@Param('id') id: string) {
    return `delete user endpoint for user ${id}`;
  }
}
