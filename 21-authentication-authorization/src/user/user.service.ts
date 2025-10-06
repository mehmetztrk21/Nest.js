import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        // Kullanıcı doğrulama işlemleri (veritabanı kontrolü vb.) burada yapılır,console.log(auth);

        const user = await this.findUserByUsername(loginDto.username) as unknown as User;
        if (!user) {
            return false;
        }
        if (!bcrypt.compareSync(loginDto.password, user.password)) {
            return false;
        }

        const payload = { username: user.username, fullName: user.fullName };
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h' // Token geçerlilik süresi //optional
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d' // Refresh token geçerlilik süresi //optional
        });
        return {
            auth: {
                username: user.username
            },
            access_token: token,
            refresh_token: refreshToken
        };
    }

    createUser(username: string, password: string, fullName?: string) {
        const passwordHash = bcrypt.hashSync(password, 10); //,10 parola karmaşıklık seviyesi
        // Kullanıcı oluşturma işlemleri (veritabanı ekleme vb.) burada yapılır
        const newUser = new this.userModel({
            username: username,
            password: passwordHash,
            fullName: fullName
        });
        return newUser.save();
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username: username }).exec();
    }

    findAllUsers() {
        return this.userModel.find().exec();
    }

    updateUser(id: string, updateData: Partial<User>) {
        if (updateData.password) {
            updateData.password = bcrypt.hashSync(updateData.password, 10);
        }
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async profile(username: string) {
        return await this.userModel.findOne({ username: username }).exec();
    }


}
