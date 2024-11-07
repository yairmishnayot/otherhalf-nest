import { Test, TestingModule } from '@nestjs/testing';
import { GroupSeederService } from './group-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from '@/modules/group/entities/group.entity';
import { Project } from '@/modules/project/entities/project.entity';
import { Repository } from 'typeorm';

describe('GroupSeederService', () => {
  let service: GroupSeederService;
  let groupRepository: Repository<Group>;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupSeederService,
        {
          provide: getRepositoryToken(Group),
          useClass: Repository, // Mock repository for Group
        },
        {
          provide: getRepositoryToken(Project),
          useClass: Repository, // Mock repository for Project if needed
        },
      ],
    }).compile();

    service = module.get<GroupSeederService>(GroupSeederService);
    groupRepository = module.get<Repository<Group>>(getRepositoryToken(Group));
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
