import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({
        groups: ['create', 'update'],
        message: 'Name is required'
    })
    @IsString({
        groups: ['create', 'update'],
        message: 'Name must be a string'
    })
    name: string
    @IsNotEmpty({
        groups: ['create'],
        message: 'Email is required'
    })
    @IsEmail({
        allow_display_name: true,
    }, {
        groups: ['create'],
        message: 'Email must be valid'
    })
    email: string
    @IsNumber({}, { groups: ['create', 'update'], message: 'Age must be a number' })
    age: number
}