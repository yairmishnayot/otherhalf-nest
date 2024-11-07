import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSeederService } from './project-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '@/modules/project/entities/project.entity';
import { Repository } from 'typeorm';

describe('ProjectSeederService', () => {
  let service: ProjectSeederService;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectSeederService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository, // Mock repository for Project
        },
      ],
    }).compile();

    service = module.get<ProjectSeederService>(ProjectSeederService);
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
