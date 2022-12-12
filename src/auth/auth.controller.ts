import { Body, Controller, Inject, Post, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ChangePasswordDto, LoginDto } from './auth.dto'
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body: LoginDto, @Request() req) {
        return this.authService.login(req.user);
    }

    // This doesn't work. I'll fix it later™
    @UseGuards(JwtAuthGuard)
    @Post('passwd')
    async change_password(@Body() body: ChangePasswordDto, @Request() req) {
        if (body.password !== body.confpass) throw new HttpException('Confirmation must match password!', HttpStatus.BAD_REQUEST)
        return this.authService.change_password(req.user.id, body.password);
    }

}
