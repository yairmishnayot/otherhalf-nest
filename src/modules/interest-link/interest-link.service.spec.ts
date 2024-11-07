import { Test, TestingModule } from '@nestjs/testing';
import { InterestLinkService } from './interest-link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InterestLink } from './entities/interest-link.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { Repository } from 'typeorm';

describe('InterestLinkService', () => {
  let service: InterestLinkService;
  let interestLinkRepository: Repository<InterestLink>;
  let clientRepository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestLinkService,
        {
          provide: getRepositoryToken(InterestLink),
          useClass: Repository, // Mock repository for InterestLink
        },
        {
          provide: getRepositoryToken(Client),
          useClass: Repository, // Mock repository for Client if needed by the service
        },
      ],
    }).compile();

    service = module.get<InterestLinkService>(InterestLinkService);
    interestLinkRepository = module.get<Repository<InterestLink>>(
      getRepositoryToken(InterestLink),
    );
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
