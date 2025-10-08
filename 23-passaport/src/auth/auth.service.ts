import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        console.log(user, email, pass);
        if (user && user.password === pass) {
            return { userId: user.userId, email: user.email };
        }
        return null;
    }
}
