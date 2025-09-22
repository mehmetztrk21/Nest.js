import { Body, Controller, Get, Param, Patch, Post, Put, Req, Res, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { AppService } from './app.service';
import type { User } from './models/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('setcookie')
  setCookie(@Res() res: Response, @Req() req: Request): void {
    console.log('Cookies: ', req.cookies);
    res.cookie('testcookie', 'testvalue', {
      httpOnly: true,
      expires: new Date(Date.now() + 900000), // 15 dakika sonra sona erer
      secure: false, // sadece HTTPS için true yapabiliriz

    });
    res.send('Cookie has been set');
  }

  @Post()
  createData(@Body() user: User) {
    console.log('User data received:', user.name);
    return {
      message: 'User data received successfully',
      userData: user,

    }
  }

  @Put(':id')
  updateData(@Body() user: User, @Param('id') id: string) {
    console.log('User data updated:', user.name, id);
    return {
      message: 'User data updated successfully',
      userData: user,
    };
  }

  @Patch(':id')
  partialUpdateData(@Body() user: Partial<User>, @Param('id') id: string) {
    console.log('User data partially updated:', user.name, id);
    return {
      message: 'User data partially updated successfully',
      userData: user,
    };
  }

  @Post('createXmlUser') // npm install express-xml-bodyparser
  createUserWithXml(@Body() user: User) {
    console.log('User created:', user.name, user);
    return {
      message: 'User created successfully',
      userData: user,
    };
  }

  @UseInterceptors(NoFilesInterceptor()) // form-data içinde dosya olmasını engeller. Formdata verisini böyle alabiliriz file olmadan.
  @Post('createFormDataUser')
  createUserWithFormData(@Body() user: User) {
    console.log('User created with form data:', user.name, JSON.stringify(user));
    return {
      message: 'User created successfully with form data',
      userData: user,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
