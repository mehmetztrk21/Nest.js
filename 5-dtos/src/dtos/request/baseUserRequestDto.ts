import { IsEmail, IsNotEmpty } from "class-validator";

export class BaseUserRequestDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}