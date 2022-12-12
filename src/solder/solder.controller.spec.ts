import { Test, TestingModule } from '@nestjs/testing';
import { SolderController } from './solder.controller';

describe('SolderController', () => {
  let controller: SolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolderController],
    }).compile();

    controller = module.get<SolderController>(SolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
