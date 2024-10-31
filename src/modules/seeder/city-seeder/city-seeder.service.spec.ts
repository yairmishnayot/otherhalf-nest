import { Test, TestingModule } from '@nestjs/testing';
import { CitySeederService } from './city-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from 'src/modules/city/entities/city.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

// Mock dependencies
const mockCityRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
const mockLogger = {
  log: jest.fn(),
};

describe('CitySeederService', () => {
  let service: CitySeederService;
  let cityRepository: Repository<City>;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitySeederService,
        { provide: getRepositoryToken(City), useValue: mockCityRepository },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CitySeederService>(CitySeederService);
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
    logger = module.get<Logger>(Logger);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save each city', async () => {
    const cities = ['אבטליון', 'אביאל', 'אביבים'];
    mockCityRepository.create.mockImplementation((data) => data);
    mockCityRepository.save.mockResolvedValue({});

    await service.seed(cities);

    expect(mockCityRepository.create).toHaveBeenCalledTimes(cities.length);
    expect(mockCityRepository.save).toHaveBeenCalledTimes(cities.length);
  });
});
