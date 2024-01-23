import { Test, TestingModule } from '@nestjs/testing';
import { UserImportService } from './user-import.service';

describe ('UserImportService', () => {
  let service: UserImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserImportService],
    }).compile();

    service = module.get<UserImportService>(UserImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
