import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}

export class RegisterDto {
    @IsNotEmpty()
    @Length(3, 24)
    username: string

    @IsNotEmpty()
    @IsEmail()
    mailaddr: string

    @IsNotEmpty()
    @Length(12, 128)
    password: string

    @IsNotEmpty()
    @Length(12, 128)
    confpass: string
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @Length(12, 128)
    password: string

    @IsNotEmpty()
    @Length(12, 128)
    confpass: string
}