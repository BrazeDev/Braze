import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PackVersionEntity } from "./packver.entity";

@Entity({ name: 'packs' })
export class PackEntity {
    @PrimaryColumn({ unique: true, length: 128 })
    slug: string;

    @Column({ nullable: true, length: 128 })
    name: string;

    @OneToMany(() => PackVersionEntity, (packver) => packver.pack)
    versions: PackVersionEntity[];

    @Column({ nullable: true, length: 256 })
    smlogoimg: string;

    @Column({ nullable: true, length: 256 })
    lglogoimg: string;

    @Column({ nullable: true, length: 256 })
    bgimg: string;

    @Column()
    created: Date;

    @Column()
    updated: Date;
}