import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UserService } from './user.service';
import { LoginDto } from './dtos/login.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("auth/login")
    async auth(@Body() auth: LoginDto, @Res() response: Response) {
        var res = await this.userService.login(auth);
        if (!res) {
            return response.status(401).json({ message: "Auth failed" });
        }
        console.log(res);
        return response.status(200).json(res);
    }

    @Post("authWithArgon")
    async authWithArgon(@Body() auth: { username: string, password: string }, @Res() response: Response) {
        console.log(auth);
        const passwordHash = await argon2.hash("1234");
        console.log(passwordHash);
        const isPasswordMatching = await argon2.verify(passwordHash, auth.password);
        if (auth.username !== "mehmet" || !isPasswordMatching) {
            return response.status(401).json({ message: "Auth failed" });
        }
        return response.status(200).json({ message: "Auth successful" });
    }

    @Post("create")
    async create(@Body() newUser: { username: string, password: string, fullName?: string }, @Res() response: Response) {
        const user = await this.userService.createUser(newUser.username, newUser.password, newUser.fullName);
        return response.status(201).json(user);
    }

    @Get("all")
    async all(@Res() response: Response) {
        const users = await this.userService.findAllUsers();
        return response.status(200).json(users);
    }
    @Put("update/:id")
    async update(@Param("id") id, @Body() updateUser: { username: string, password: string, fullName?: string }, @Res() response: Response) {
        const user = await this.userService.updateUser(id, updateUser);
        return response.status(200).json(user);
    }


}
