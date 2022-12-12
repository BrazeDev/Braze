import { Module } from '@nestjs/common';
import { PacksController } from './packs.controller';
import { PacksService } from './packs.service';

@Module({
  controllers: [PacksController],
  providers: [PacksService]
})
export class PacksModule {}
