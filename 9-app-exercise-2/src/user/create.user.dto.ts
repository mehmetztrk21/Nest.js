import { IsEmail, IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Ad boş olamaz' })
    name: string;

    @IsEmail({}, { message: 'Email geçerli değil' })
    email: string;

    @IsInt({ message: 'Yaş bir sayı olmalı' })
    @Min(0, { message: 'Yaş negatif olamaz' })
    age: number;
}