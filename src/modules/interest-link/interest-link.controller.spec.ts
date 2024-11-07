import { Test, TestingModule } from '@nestjs/testing';
import { InterestLinkController } from './interest-link.controller';
import { InterestLinkService } from './interest-link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InterestLink } from './entities/interest-link.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/modules/client/entities/client.entity';

describe('InterestLinkController', () => {
  let controller: InterestLinkController;
  let service: InterestLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestLinkController],
      providers: [
        InterestLinkService,
        {
          provide: getRepositoryToken(InterestLink),
          useClass: Repository, // Mock repository for InterestLink
        },
        {
          provide: getRepositoryToken(Client),
          useClass: Repository, // Mock repository for Client if needed
        },
      ],
    }).compile();

    controller = module.get<InterestLinkController>(InterestLinkController);
    service = module.get<InterestLinkService>(InterestLinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
