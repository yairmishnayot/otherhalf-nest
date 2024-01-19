import { Test, TestingModule } from '@nestjs/testing';
import { GroupSeederService } from './group-seeder.service';

describe('GroupSeederService', () => {
  let service: GroupSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeederService],
    }).compile();

    service = module.get<GroupSeederService>(GroupSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
