import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ModVersionEntity } from "./modver.entity";
import { PackEntity } from "./pack.entity";

@Entity({ name: 'packversions' })
export class PackVersionEntity {
    @PrimaryColumn({ unique: true, length: 128 })
    slug: string;

    @Column({ nullable: true, length: 128 })
    name: string;

    @ManyToOne(() => PackEntity, (pack) => pack.versions)
    pack: PackEntity;

    @ManyToMany(() => ModVersionEntity)
    @JoinTable()
    mods: ModVersionEntity[];

    @Column()    
    created: Date;

    @Column()
    updated: Date;
}