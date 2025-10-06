import { Body, Controller, Post, Req, Res, Session } from '@nestjs/common';
import { LoginDto } from 'src/user/dtos/login.dto';
import { AuthService } from './auth.service';
import { randomUUID } from 'crypto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("login")
    async login(@Body() LoginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const sessionId = randomUUID();
        await this.authService.createSession(sessionId, { username: LoginDto.username });
        res.cookie("sessionid", sessionId, {
            httpOnly: true,
            secure: false, //true ise sadece https üzerinden gönderilir
            sameSite: 'lax', //cross-site isteklerde çerez gönderilmez
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 gün
        });
        return { message: "Login successful" };
    }

    @Post("profile")
    profile(@Res({ passthrough: true }) res: Response, @Req() req: any) {
        const sessionId = req.cookies["sessionid"];
        console.log("Session ID from cookie:", sessionId);
        if (!sessionId) {
            res.status(401);
            return { message: "No session" };
        }
        return this.authService.getSession(sessionId).then(session => {
            if (session) {
                return { message: `Welcome ${session.data.username}` };
            } else {
                res.status(401);
                return { message: "Invalid session" };
            }
        });
    }

    @Post("logout")
    async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const sessionId = req.cookies["sessionid"];
        if (sessionId) {
            await this.authService.deleteSession(sessionId);
            res.clearCookie("sessionid");
        }
        return { message: "Logged out" };
    }

}
