import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email: string

    @IsOptional()
    @IsBoolean()
    admin: boolean
}