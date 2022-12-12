import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
    ) { super(); }

    async validate(username: string, password: string) {
        const user = await this.authService.validate_user(username, password);
        if (!user) throw new UnauthorizedException();
        let { passhash, ...stripped } = user;
        return stripped;
    }

}