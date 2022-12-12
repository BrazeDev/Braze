import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateModDto, UpdateModDto } from './mods.dto';
import { ModsService } from './mods.service';

@Controller('mods')
export class ModsController {

    constructor(
        private readonly modsService: ModsService
    ) {}

    @Get()
    get_mods() {
        return this.modsService.get_mods();
    }

    @Get(':slug')
    get_mod_by_id(
        @Param('slug') slug: string,
    ) {
        return this.modsService.get_mod_by_id(slug);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create_mod(@Body() body: CreateModDto) {
        return this.modsService.create_mod(body);
    }

    @Patch(':slug')
    async update_mod_by_id(
        @Param('slug') slug: string,
        @Body() body: UpdateModDto
    ) {
        await this.modsService.update_mod_by_id(slug, body);
    }

    @Delete(':slug')
    delete_mod_by_id(
        @Param('slug') slug: string,
    ) {
        return this.modsService.delete_mod_by_id(slug);
    }

    @Get(':modslug/:verslug')
    get_mod_version(
        @Param('modslug') modslug: string,
        @Param('verslug') verslug: string,
    ) {
        return this.modsService.get_mod_version(modslug, verslug);
    }

    @Post(':slug')
    create_mod_version(
        @Param('slug') slug: string,
        @Body() body: any,
    ) {
        return this.modsService.create_mod_version(slug, body);
    }

    @Patch(':modslug/:verslug')
    update_mod_version(
        @Param('modslug') modslug: string,
        @Param('verslug') verslug: string,
        @Body() body: any,
    ) {
        return this.modsService.update_mod_version(modslug, verslug, body);
    }

    @Delete(':modslug/:verslug')
    delete_mod_version(
        @Param('modslug') modslug: string,
        @Param('verslug') verslug: string,
    ) {
        return this.modsService.delete_mod_version(modslug, verslug);
    }

}
