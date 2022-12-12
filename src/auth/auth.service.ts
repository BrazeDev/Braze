import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/util/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {

    constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) {}

    async validate_user(username: string, password: string) {
        const user = await this.usersService.find_user_by_username(username);
        if (user) {
            if (this.usersService.verify_user_password(password, user.passhash)) {
                return user
            } else {
            }
        } else {
            // This prevents timing based side-channel attacks to find valid usernames
            this.usersService.verify_user_password(
                "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefgh", 
                "$2b$16$3VrDmSJoZlgRmrEQJtiTOe3FVor4HCmaIHQhbsPi1CwUICQYgV19u",
            )
        }
        return null
    }

    async login(user: UserEntity) {
        const payload = { username: user.username, sub: user.user_id };
        return {
            access_token: this.jwtService.sign(payload, jwtConstants),
        }
    }

    async change_password(user_id: number, newpass: string) {
        return this.usersService.change_password_by_id(user_id, newpass);
    }

}
