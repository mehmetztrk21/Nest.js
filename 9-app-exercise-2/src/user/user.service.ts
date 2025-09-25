import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    private users: User[] = [];
    private idCounter = 1;

    createUser(name: string, email: string, age: number): User {
        const newUser: User = {
            id: this.idCounter++,
            name,
            email,
            age,
        };
        this.users.push(newUser);
        return newUser;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | null {
        return this.users.find(user => user.id === id) || null;
    }

    updateUser(id: number, name?: string, email?: string, age?: number): User | null {
        const user = this.getUserById(id);
        if (!user) {
            return null;
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        return user;
    }
    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}
