import { Test, TestingModule } from '@nestjs/testing';
import { CitySeederService } from './city-seeder.service';

describe('CitySeederService', () => {
  let service: CitySeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitySeederService],
    }).compile();

    service = module.get<CitySeederService>(CitySeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
