import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModEntity } from 'src/util/entities/mod.entity';
import { ModVersionEntity } from 'src/util/entities/modver.entity';
import { ModsController } from './mods.controller';
import { ModsService } from './mods.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModEntity, ModVersionEntity])],
  controllers: [ModsController],
  providers: [ModsService]
})
export class ModsModule {}
