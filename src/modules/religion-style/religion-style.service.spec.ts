import { Test, TestingModule } from '@nestjs/testing';
import { ReligionStyleService } from './religion-style.service';

describe('ReligionStyleService', () => {
  let service: ReligionStyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReligionStyleService],
    }).compile();

    service = module.get<ReligionStyleService>(ReligionStyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
