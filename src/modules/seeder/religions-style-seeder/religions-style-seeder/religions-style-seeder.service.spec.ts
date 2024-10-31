import { Test, TestingModule } from '@nestjs/testing';
import { ReligionsStyleSeederService } from './religions-style-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReligionStyle } from 'src/modules/religion-style/entities/religion-style.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

// Mock dependencies
const mockReligionStyleRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};
const mockLogger = {
  log: jest.fn(),
  // Ensure the logger is functioning properly in tests
  setContext: jest.fn(),
};

describe('ReligionsStyleSeederService', () => {
  let service: ReligionsStyleSeederService;
  let religionStyleRepository: Repository<ReligionStyle>;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReligionsStyleSeederService,
        {
          provide: getRepositoryToken(ReligionStyle),
          useValue: mockReligionStyleRepository,
        },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ReligionsStyleSeederService>(
      ReligionsStyleSeederService,
    );
    religionStyleRepository = module.get<Repository<ReligionStyle>>(
      getRepositoryToken(ReligionStyle),
    );
    logger = module.get<Logger>(Logger);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save new religion styles', async () => {
    mockReligionStyleRepository.findOne.mockResolvedValue(null);
    mockReligionStyleRepository.save.mockResolvedValue({});

    await service.seed();

    expect(mockReligionStyleRepository.save).toHaveBeenCalledTimes(8);
  });
});
