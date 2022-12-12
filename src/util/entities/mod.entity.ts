import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ModVersionEntity } from "./modver.entity";

@Entity({ name: 'mods' })
export class ModEntity {
    @PrimaryColumn({ unique: true, length: 128 })
    slug: string;

    @Column({ nullable: true, length: 128 })
    name: string;

    @Column({ nullable: true, length: 128 })
    author: string;

    @Column({ nullable: true, length: 8192 })
    description: string;

    @Column({ nullable: true, length: 256 })
    link: string; 

    @OneToMany(() => ModVersionEntity, (modver) => modver.mod)
    versions: ModVersionEntity[];

    @Column()
    created: Date;

    @Column()
    updated: Date;
}