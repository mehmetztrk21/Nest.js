import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'dtos/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  // //@UsePipes(new ValidationPipe()) // dto da yazdığımız kurallara göre validasyon yapar
  // @UsePipes(new ValidationPipe({
  //   errorHttpStatusCode: 400, // default 400
  //   whitelist: true, // dto da olmayan extra fieldları atar
  //   transform: true // gelen veriyi dto class ına çevirir (örneğin string olarak gelen sayısal bir değeri number a çevirir)
  // })) // global pipe ayarlarını main.ts de yaptığımız için artık burada yazmaya gerek yok
  createUser(@Body() userDto: CreateUserDto) {
    console.log('User created', userDto);
    return {
      message: 'User created',
      user: userDto
    }
  }
  @Post('custom')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: false, // groups kullanırken false olmalı
    forbidNonWhitelisted: false,
    groups: ['create'], // sadece 'create' grubundaki validasyonları uygula
    errorHttpStatusCode: 400,
    skipMissingProperties: false // eksik propertyler için de validasyon çalıştır
  }))
  async createCustomUser(@Body() userDto: CreateUserDto) {
    console.log('User created', userDto);
    return {
      message: 'User created',
      user: userDto
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string { // ParseIntPipe ile id parametresini number a çeviriyoruz, eğer çevrilemezse 400 hatası döner
    // farklı pipe lar da yazabiliriz, örneğin ParseBoolPipe, ParseArrayPipe, DefaultValuePipe, etc.
    return `User with ID: ${id}`;
  }
  @Get('users')
  getUsers(@Query("isEnabled", ParseBoolPipe) isEnabled: boolean): string {
    return `All users ${isEnabled ? 'enabled' : 'disabled'}`;
  }

  @Get('getPagination')
  getPagination(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number): string {
    // page ve limit query parametreleri opsiyonel, eğer gelmezse sırasıyla 1 ve 10 default değerleri atanır
    return `Pagination: Page ${page}, Limit ${limit}`;
  }
}
