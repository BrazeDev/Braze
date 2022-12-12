import { Test, TestingModule } from '@nestjs/testing';
import { PacksService } from './packs.service';

describe('PacksService', () => {
  let service: PacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacksService],
    }).compile();

    service = module.get<PacksService>(PacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
