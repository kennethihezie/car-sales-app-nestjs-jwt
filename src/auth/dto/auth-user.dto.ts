import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsNotEmpty()
    password: string
}