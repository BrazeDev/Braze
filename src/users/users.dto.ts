import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
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

export class UpdateUserDto {
    username: string

    mailaddr: string

    password: string

    confpass: string
}
