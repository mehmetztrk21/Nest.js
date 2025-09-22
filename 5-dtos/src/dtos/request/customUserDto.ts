import { OmitType } from "@nestjs/mapped-types";
import { IUser } from "src/models/user";

// OmitType ile IUser içerisinden password ve isDeleted alanlarını çıkarıyoruz
// ve CustomUserDto adında yeni bir DTO oluşturuyoruz.
// as const ile alan isimlerini readonly yapıyoruz ki yanlışlıkla değiştirilmesinler.
// Bu da farklı bir yolla DTO oluşturma şeklidir.
export class CustomUserDto extends OmitType(IUser, ['password', 'isDeleted'] as const) { }