import { Test, TestingModule } from '@nestjs/testing';
import { RoleSeederService } from './role-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/modules/role/entities/role.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

// Mock dependencies
const mockRoleRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
const mockLogger = {
  log: jest.fn(),
};

describe('RoleSeederService', () => {
  let service: RoleSeederService;
  let roleRepository: Repository<Role>;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleSeederService,
        { provide: getRepositoryToken(Role), useValue: mockRoleRepository },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<RoleSeederService>(RoleSeederService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    logger = module.get<Logger>(Logger);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save each role', async () => {
    const roles = [
      { name: 'CEO', hebrewName: 'מנכ"ל' },
      { name: 'Manager', hebrewName: 'מנהל' },
    ];
    mockRoleRepository.create.mockImplementation((data) => data);
    mockRoleRepository.save.mockResolvedValue({});

    await service.seed(roles);

    expect(mockRoleRepository.create).toHaveBeenCalledTimes(roles.length);
    expect(mockRoleRepository.save).toHaveBeenCalledTimes(roles.length);
  });
});
