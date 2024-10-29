import { Test, TestingModule } from '@nestjs/testing';
import { ClientSeederService } from './client-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '@/modules/client/entities/client.entity';
import { User } from '@/modules/user/entities/user.entity';
import { UserGroup } from '@/modules/user-group/entities/user-group.entity';
import { City } from '@/modules/city/entities/city.entity';
import { ReligionStyle } from '@/modules/religion-style/entities/religion-style.entity';
import { Ethnicity } from '@/modules/ethnicity/entities/ethnicity.entity';

describe('ClientSeederService', () => {
  let service: ClientSeederService;

  // Mock repository with basic functions
  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientSeederService,
        // Mock ClientRepository
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
        // Mock UserRepository
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        // Mock UserGroupRepository
        {
          provide: getRepositoryToken(UserGroup),
          useValue: mockRepository,
        },
        // Mock CityRepository
        {
          provide: getRepositoryToken(City),
          useValue: mockRepository,
        },
        // Mock ReligionStyleRepository
        {
          provide: getRepositoryToken(ReligionStyle),
          useValue: mockRepository,
        },
        // Mock EthnicityRepository
        {
          provide: getRepositoryToken(Ethnicity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientSeederService>(ClientSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
