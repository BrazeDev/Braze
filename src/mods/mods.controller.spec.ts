import { Test, TestingModule } from '@nestjs/testing';
import { ModsController } from './mods.controller';

describe('ModsController', () => {
  let controller: ModsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModsController],
    }).compile();

    controller = module.get<ModsController>(ModsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
