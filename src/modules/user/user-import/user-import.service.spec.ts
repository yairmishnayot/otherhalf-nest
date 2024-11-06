import { Test, TestingModule } from '@nestjs/testing';
import { UserImportService } from './user-import.service';
import { Repository } from 'typeorm';
import { User } from './../entities/user.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserImportService', () => {
  let service: UserImportService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let groupRepository: Repository<Group>;
  let userGroupRepository: Repository<UserGroup>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserImportService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Group),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserGroup),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserImportService>(UserImportService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    groupRepository = module.get<Repository<Group>>(getRepositoryToken(Group));
    userGroupRepository = module.get<Repository<UserGroup>>(
      getRepositoryToken(UserGroup),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
