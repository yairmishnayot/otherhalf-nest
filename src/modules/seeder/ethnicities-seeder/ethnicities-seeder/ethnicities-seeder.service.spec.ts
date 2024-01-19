import { Test, TestingModule } from '@nestjs/testing';
import { EthnicitiesSeederService } from './ethnicities-seeder.service';

describe('EthnicitiesSeederService', () => {
  let service: EthnicitiesSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthnicitiesSeederService],
    }).compile();

    service = module.get<EthnicitiesSeederService>(EthnicitiesSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
