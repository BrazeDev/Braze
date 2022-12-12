import { Test, TestingModule } from '@nestjs/testing';
import { PacksController } from './packs.controller';

describe('PacksController', () => {
  let controller: PacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacksController],
    }).compile();

    controller = module.get<PacksController>(PacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
