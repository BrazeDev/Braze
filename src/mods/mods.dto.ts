import { IsNotEmpty, Length } from "class-validator";

export class CreateModDto {
    @IsNotEmpty()
    @Length(3, 128)
    slug: string

    name: string

    author: string

    description: string

    link: string
}

export class UpdateModDto {
    slug: string
    name: string
    author: string
    description: string
    link: string
}