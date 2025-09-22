import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/createUserDto';
import { UpdateUserDto } from './dtos/request/updateUserDto';
import { UserResponseDto } from './dtos/response/userResponseDto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(user: CreateUserDto): UserResponseDto {
    console.log(`User ${user.name} with email ${user.email} created successfully!`);
    const createdUser: UserResponseDto = {
      id: Math.floor(Math.random() * 1000),
      name: user.name,
      email: user.email,
    };
    return createdUser;
  }
  updateUser(user: UpdateUserDto): UserResponseDto {
    var updateUser: UpdateUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      hasAccess: user.hasAccess ?? true
    }
    console.log(`User with ID ${user.id} updated successfully!`);
    const updatedUser: UserResponseDto = {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email
    };
    return updatedUser;
  }
}
