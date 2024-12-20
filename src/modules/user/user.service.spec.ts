import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let userGroupRepository: Repository<UserGroup>;
  let clientRepository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock repository for User
        },
        {
          provide: getRepositoryToken(UserGroup),
          useClass: Repository, // Mock repository for UserGroup
        },
        {
          provide: getRepositoryToken(Client),
          useClass: Repository, // Mock repository for Client
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userGroupRepository = module.get<Repository<UserGroup>>(
      getRepositoryToken(UserGroup),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
