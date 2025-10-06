import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("auth/login")
    auth(@Body() auth: { username: string, password: string }, @Res() response: Response) {
        var res = this.userService.login(auth.username, auth.password);
        if (!res) {
            return response.status(401).json({ message: "Auth failed" });
        }
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
}
