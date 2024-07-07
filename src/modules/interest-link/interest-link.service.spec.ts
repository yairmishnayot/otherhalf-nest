import { Test, TestingModule } from '@nestjs/testing';
import { InterestLinkService } from './interest-link.service';

describe('InterestLinkService', () => {
  let service: InterestLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestLinkService],
    }).compile();

    service = module.get<InterestLinkService>(InterestLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
