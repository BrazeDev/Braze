import { Test, TestingModule } from '@nestjs/testing';
import { SolderService } from './solder.service';

describe('SolderService', () => {
  let service: SolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolderService],
    }).compile();

    service = module.get<SolderService>(SolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
