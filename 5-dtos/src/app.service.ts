import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/request/createUserDto';
import { UpdateUserDto } from './dtos/request/updateUserDto';
import { ProductResponseDto } from './dtos/response/productResponseDto';
import { UserResponseDto } from './dtos/response/userResponseDto';
import { ProductEntity } from './entity/product';

@Injectable()
export class AppService {
  constructor() {
    const productEntity = new ProductEntity();
    productEntity.id = 1;
    productEntity.name = "Sample Product";
    productEntity.description = "This is a sample product.";
    productEntity.price = 99.99;
    productEntity.isActive = true;
    console.log(productEntity);
    const productResponseDto = plainToInstance(ProductResponseDto, productEntity, {
      excludeExtraneousValues: true // Sadece belirtilen alanları içeren bir nesne oluştur
    });
    console.log(productResponseDto);
  }

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
