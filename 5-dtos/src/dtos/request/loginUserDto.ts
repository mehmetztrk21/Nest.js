import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUserDto";

// pickType ile CreateUserDto içerisinden sadece email ve password alanlarını seçiyoruz
// ve LoginUserDto adında yeni bir DTO oluşturuyoruz.
// as const ile alan isimlerini readonly yapıyoruz ki yanlışlıkla değiştirilmesinler.
//Bu da farklı bir yolla DTO oluşturma şeklidir.
export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password'] as const) { }