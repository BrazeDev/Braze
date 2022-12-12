import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto'
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    get_users() {
        return this.usersService.get_users();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create_user(@Body() body: CreateUserDto) {
        if (body.password !== body.confpass) throw new HttpException('Confirmation must match password!', HttpStatus.BAD_REQUEST)
        const { confpass, ...user } = body;
        return this.usersService.create_user(user);
    }

    @Patch(':user_id')
    async update_user_by_id(
        @Param('user_id', ParseIntPipe) user_id: number,
        @Body() body: UpdateUserDto
    ) {
        if (body.password !== body.confpass) throw new HttpException('Confirmation must match password!', HttpStatus.BAD_REQUEST)
        const { confpass, ...user } = body;
        await this.usersService.update_user_by_id(user_id, user);
    }

    @Delete(':user_id')
    async delete_user(
        @Param('user_id', ParseIntPipe) user_id: number,
    ) {
        return this.usersService.delete_user(user_id);
    }

}
