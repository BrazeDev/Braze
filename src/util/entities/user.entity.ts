import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    user_id: number;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    mailaddr: string;

    @Column()
    passhash: string;

    @Column({ default: true })
    enabled: boolean;

    @Column({ default: false })
    is_admin: boolean;

    @Column()
    created: Date;

    @Column()
    updated: Date;
}