import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/request/createUserDto';
import { UpdateUserDto } from './dtos/request/updateUserDto';
import { UserResponseDto } from './dtos/response/userResponseDto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  createUser(@Body() user: CreateUserDto): UserResponseDto {
    return this.appService.createUser(user);
  }
  @Put()
  updateUser(@Body() user: UpdateUserDto): UserResponseDto {
    return this.appService.updateUser(user);
  }
}
