import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString({
        message: 'Name must be a string'
    })
    name: string
    @IsNotEmpty({
        message: 'Email is required'
    })
    @IsEmail({
        allow_display_name: true,
    }, {
        message: 'Email must be valid'
    })
    email: string
    @IsNumber({}, {
        message: 'Age must be a number'
    })
    age: number
}