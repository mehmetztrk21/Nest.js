import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UserService } from './user.service';
import { LoginDto } from './dtos/login.dto';
import type { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("auth/login")
    async auth(@Body() auth: LoginDto, @Res({ passthrough: true }) response: Response) {
        const authResult = await this.userService.login(auth);
        if (!authResult) {
            response.status(401);
            return { message: "Auth failed" };
        }
        console.log(authResult);
        response.cookie("refresh_token", authResult.refresh_token, { // bu şekilde refresh token çerezine atılır
            httpOnly: true,
            secure: false, //true ise sadece https üzerinden gönderilir
            sameSite: 'lax', //cross-site isteklerde çerez gönderilmez
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 gün
        });
        response.status(200);
        return authResult;
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

    @Get("profile")
    async profile(@Req() req: any, @Res() response: Response) {
        const username = req?.user?.username;
        console.log("Authenticated username:", username);
        if (!username) {
            return response.status(401).json({ message: "Unauthorized" });
        }
        const user = await this.userService.profile(username);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json(user);
    }
}
