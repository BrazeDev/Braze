import { Test, TestingModule } from '@nestjs/testing';
import { ModsService } from './mods.service';

describe('ModsService', () => {
  let service: ModsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModsService],
    }).compile();

    service = module.get<ModsService>(ModsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
