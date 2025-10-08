import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            email: 'maria',
            password: 'guessme',
        },
        {
            userId: 3,
            email: 'mehmet',
            password: '123',
        }
    ];

    async findByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

}
