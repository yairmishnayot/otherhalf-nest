import { Test, TestingModule } from '@nestjs/testing';
import { ClientSeederService } from './client-seeder.service';

describe('ClientSeederService', () => {
  let service: ClientSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientSeederService],
    }).compile();

    service = module.get<ClientSeederService>(ClientSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
