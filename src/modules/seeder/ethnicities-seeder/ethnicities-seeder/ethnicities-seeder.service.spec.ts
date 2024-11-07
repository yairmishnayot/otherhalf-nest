import { Test, TestingModule } from '@nestjs/testing';
import { EthnicitiesSeederService } from './ethnicities-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ethnicity } from '@/modules/ethnicity/entities/ethnicity.entity';
import { Repository } from 'typeorm';

describe('EthnicitiesSeederService', () => {
  let service: EthnicitiesSeederService;
  let ethnicityRepository: Repository<Ethnicity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EthnicitiesSeederService,
        {
          provide: getRepositoryToken(Ethnicity),
          useClass: Repository, // Mock repository for Ethnicity
        },
      ],
    }).compile();

    service = module.get<EthnicitiesSeederService>(EthnicitiesSeederService);
    ethnicityRepository = module.get<Repository<Ethnicity>>(
      getRepositoryToken(Ethnicity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
