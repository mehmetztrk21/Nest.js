import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUserDto";

// PartialType ile CreateUserDto içerisindeki tüm alanları opsiyonel yapıyoruz
// ve OptionalUserPickDto adında yeni bir DTO oluşturuyoruz.
// Bu da farklı bir yolla DTO oluşturma şeklidir.
export class OptionalUserPickDto extends PartialType(CreateUserDto) { }