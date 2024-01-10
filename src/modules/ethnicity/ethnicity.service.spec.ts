import { Test, TestingModule } from '@nestjs/testing';
import { EthnicityService } from './ethnicity.service';

describe('EthnicityService', () => {
  let service: EthnicityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthnicityService],
    }).compile();

    service = module.get<EthnicityService>(EthnicityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
