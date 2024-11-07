import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserImportService } from './user-import/user-import.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let userImportService: UserImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserImportService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock repository for User
        },
        {
          provide: getRepositoryToken(UserGroup),
          useClass: Repository, // Mock repository for UserGroup
        },
        {
          provide: UserImportService,
          useValue: {
            importUsers: jest.fn(), // Mock method for import functionality
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userImportService = module.get<UserImportService>(UserImportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
