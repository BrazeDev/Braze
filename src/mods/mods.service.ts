import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModEntity } from 'src/util/entities/mod.entity';
import { ModVersionEntity } from 'src/util/entities/modver.entity';
import { Repository } from 'typeorm';
import { CreateModParams, UpdateModParams } from './mods.types';

@Injectable()
export class ModsService {

    constructor(
        @InjectRepository(ModEntity) private readonly modRepository: Repository<ModEntity>,
        @InjectRepository(ModVersionEntity) private readonly versionRepository: Repository<ModVersionEntity>,
    ) {}

    get_mods() {
        return this.modRepository.find();
    }

    get_mod_by_id(slug: string) {
        return this.modRepository.findOneBy({ slug })
    }

    create_mod(body: CreateModParams) {
        const mod = this.modRepository.create({
            ...body,
            created: new Date(),
            updated: new Date(),
        });
        return this.modRepository.save(mod);
    }

    update_mod_by_id(slug: string, body: UpdateModParams) {
        return this.modRepository.update({ slug }, { ...body });
    }

    delete_mod_by_id(slug: string) {
        let mod = this.modRepository.findOneBy({ slug });
        if (!mod) throw new NotFoundException();
        this.modRepository.delete({ slug })
    }

    get_mod_version(modslug: string, verslug: string) {

    }

    create_mod_version(modslug: string, body: any) {

    }

    update_mod_version(modslug: string, verslug: string, body: any) {
        
    }

    delete_mod_version(modslug: string, verslug: string) {
        
    }

}
