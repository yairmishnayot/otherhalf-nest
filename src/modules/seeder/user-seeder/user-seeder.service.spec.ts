import { Test, TestingModule } from '@nestjs/testing';
import { UserSeederService } from './user-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity'; // Adjust paths if needed
import { Group } from '../../group/entities/group.entity';
import { UserGroup } from '../../user-group/entities/user-group.entity';
import { Role } from '../../role/entities/role.entity';

describe('UserSeederService', () => {
  let service: UserSeederService;

  // Mock repository with basic functions
  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSeederService,
        // Mock UserRepository
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        // Mock GroupRepository
        {
          provide: getRepositoryToken(Group),
          useValue: mockRepository,
        },
        // Mock UserGroupRepository
        {
          provide: getRepositoryToken(UserGroup),
          useValue: mockRepository,
        },
        // Mock RoleRepository
        {
          provide: getRepositoryToken(Role),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserSeederService>(UserSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
