import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Scope,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';

// @Controller('users')
@Controller({
  path: 'users',
  scope: Scope.DEFAULT, //default scope: singleton (tüm uygulama boyunca tek bir instance kullanılır). Controller 1 defa oluşturulur ve tüm isteklerde aynı instance kullanılır.
  // scope: Scope.REQUEST //her istek için yeni bir instance oluşturulur. Controller her istek için yeniden oluşturulur.
  // scope: Scope.TRANSIENT //her kullanımda yeni bir instance oluşturulur. Controller her kullanımda yeniden oluşturulur.
  // host: 'abc.com', //bu controller sadece abc.com adresine gelen isteklerde aktif olur.
  version: ['1', '2'], //versioning için kullanılır. Bu controller hem v1 hem de v2 isteklerinde aktif olur. main.ts içinde versioning ayarları yapılmalı. VersioningType.URI kullanılırsa endpointler http://localhost:3000/v1/users ve http://localhost:3000/v2/users olur.
})
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get() // http://localhost:3000/users
  test() {
    this.usersService.testConfig();
    return 'get user endpoint';
  }

  @Get(':id') // http://localhost:3000/users/1
  @Version(['1', '2']) //sadece v1 ve v2 isteklerinde aktif olur.
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post() // http://localhost:3000/users
  @Version('2') //sadece v2 isteklerinde aktif olur. Ör : http://localhost:3000/v2/users
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
