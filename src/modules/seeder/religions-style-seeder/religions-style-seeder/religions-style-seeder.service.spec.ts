import { Test, TestingModule } from '@nestjs/testing';
import { ReligionsStyleSeederService } from './religions-style-seeder.service';

describe('ReligionsStyleSeederService', () => {
  let service: ReligionsStyleSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReligionsStyleSeederService],
    }).compile();

    service = module.get<ReligionsStyleSeederService>(
      ReligionsStyleSeederService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
