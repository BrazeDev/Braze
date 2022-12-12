import { Module } from '@nestjs/common';
import { SolderController } from './solder.controller';
import { SolderService } from './solder.service';

@Module({
  controllers: [SolderController],
  providers: [SolderService]
})
export class SolderModule {}
