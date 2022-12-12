import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ModEntity } from "./mod.entity";

@Entity({ name: 'modversions' })
export class ModVersionEntity {
    @PrimaryColumn({ unique: true, length: 128 })
    slug: string;

    @Column({ nullable: true, length: 128 })
    name: string;

    @Column({ type: 'bigint'})
    size: bigint;

    @Column({ length: 64 })
    md5: string;

    @Column({ length: 256 })
    url: string;

    @ManyToOne(() => ModEntity, (mod) => mod.versions)
    mod: ModEntity;

    @Column()
    created: Date;

    @Column()
    updated: Date;
}