import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSeederService } from './project-seeder.service';

describe('ProjectSeederService', () => {
  let service: ProjectSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectSeederService],
    }).compile();

    service = module.get<ProjectSeederService>(ProjectSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
