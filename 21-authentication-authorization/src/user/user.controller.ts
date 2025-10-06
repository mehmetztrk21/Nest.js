import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';

@Controller('user')
export class UserController {

    @Post("auth")
    auth(@Body() auth: { username: string, password: string }, @Res() response: Response) {
        console.log(auth);
        const passwordHash = bcrypt.hashSync("1234", 10); //,10 parola karmaşıklık seviyesi
        console.log(passwordHash);
        const isPasswordMatching = bcrypt.compareSync(auth.password, passwordHash);
        if (auth.username !== "mehmet" || !isPasswordMatching) {
            return response.status(401).json({ message: "Auth failed" });
        }
        return response.status(200).json({ message: "Auth successful" });
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
