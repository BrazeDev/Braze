import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/util/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from './users.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async find_user_by_username(username: string) {
        return await this.userRepository.findOneBy({ username });
    }

    async find_user_by_id(user_id: number) {
        return await this.userRepository.findOneBy({ user_id });
    }

    verify_user_password(test: string, hash: string) {
        return bcrypt.compareSync(test, hash);
    }

    get_users() {
        return this.userRepository.find();
    }
    
    create_user(body: CreateUserParams) {
        const { password, ...user } = body; 
        const passhash = bcrypt.hashSync(password, 16);
        const new_user = this.userRepository.create({
            ...user,
            passhash, 
            created: new Date(),
            updated: new Date(),
        });
        return this.userRepository.save(new_user);
    }

    update_user_by_id(user_id: number, body: UpdateUserParams) {
        if (body.password) {
            const { password, ...user } = body;
            const passhash = bcrypt.hashSync(password, 16);
            return this.userRepository.update({ user_id }, { ...user, passhash })
        }
        return this.userRepository.update({ user_id }, { ...body })
    }

    change_password_by_id(user_id: number, newpass: string) {
        const passhash = bcrypt.hashSync(newpass, 16);
        return this.userRepository.update({ user_id }, { passhash })
    }

    delete_user(user_id: number) {
        return this.userRepository.delete({ user_id });
    }

}
