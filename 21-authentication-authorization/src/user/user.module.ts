import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true, //modülün global olmasını sağlar
      secret: 'mySecretKey', //gizli anahtar
      signOptions: {
        expiresIn: '60s', //token 60 saniye sonra geçersiz olur
        algorithm: 'HS256',
        audience: 'urn:myapi', //tokenin hedef kitlesi
        issuer: 'my-nest-js-api', //tokeni oluşturan
        subject: 'auth', //tokenin konusu
        jwtid: 'unique-id', //tokenin benzersiz kimliği
        // "notBefore": Math.floor(Date.now() / 1000) + 10 //tokenin geçerli olmaya başlayacağı zaman (şuandan 10 saniye sonra)

      },
      verifyOptions: {
        algorithms: ['HS256'],
        audience: 'urn:myapi',
        issuer: 'my-nest-js-api',
        subject: 'auth',
        maxAge: '120s', //tokenin maksimum geçerlilik süresi
        // ignoreExpiration: true //tokenin süresinin dolup dolmadığını yoksay. 
        // complete: true //tüm doğrulama seçeneklerini kontrol et
        jwtid: 'unique-id'
      }
    }
    ),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
