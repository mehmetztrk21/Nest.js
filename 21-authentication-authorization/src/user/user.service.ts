import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    login(username: string, password: string) {
        // Kullanıcı doğrulama işlemleri (veritabanı kontrolü vb.) burada yapılır,console.log(auth);
        const passwordHash = bcrypt.hashSync("1234", 10); //,10 parola karmaşıklık seviyesi
        console.log(passwordHash);
        const isPasswordMatching = bcrypt.compareSync(password, passwordHash);
        if (username !== "mehmet" || !isPasswordMatching) {
            return false;
        }
        const payload = { username: username }; //sub: subject, genellikle kullanıcı ID'si
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h' // Token geçerlilik süresi //optional
        });
        return {
            access_token: token
        };
    }
}
