import { Test, TestingModule } from '@nestjs/testing';
import { ClientInterestService } from './client-interest.service';

describe('ClientInterestService', () => {
  let service: ClientInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientInterestService],
    }).compile();

    service = module.get<ClientInterestService>(ClientInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
