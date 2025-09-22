// validasyon için: npm install class-validator class-transformer
// DTO: Data Transfer Object
// genellikle request body'lerini validate etmek için kullanılır.
// request body'lerinin yapısını tanımlamak için kullanılır.
// genellikle class olarak tanımlanır.
// class-transformer ve class-validator paketleri ile birlikte kullanılır.
// class-transformer: plain object'leri class instance'larına dönüştürmek için kullanılır.
// class-validator: class instance'larını validate etmek için kullanılır.
// DTO'lar genellikle src/dtos klasöründe tutulur.

import { BaseUserRequestDto } from './baseUserRequestDto';
//eğer interface kullanırsak class validasyon yapamayız. Bu yüzden class kullanıyoruz.
export class CreateUserDto extends BaseUserRequestDto {
}