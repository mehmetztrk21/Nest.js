import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator"

export class StudentDto {
    @IsString()
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string
    @IsNumber({}, {
        message: 'Age must be a number'
    })
    age: number
    @IsNotEmpty({
        message: 'Email is required'
    })
    @IsEmail({}, {
        message: 'Email must be valid'
    })
    email: string

    @IsNotEmpty({
        message: 'Password is required'
    })
    isSSO: boolean
    @IsString()
    @ValidateIf(o => o.isSSO !== true) // isSSO true değilse password validasyonu yap
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    @MaxLength(20, {
        message: 'Password must be at most 20 characters long'
    })
    password: string

    @IsString()
    @IsOptional()
    address?: string // opsiyonel alan
}