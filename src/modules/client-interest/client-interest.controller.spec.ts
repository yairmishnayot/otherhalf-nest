import { Test, TestingModule } from '@nestjs/testing';
import { ClientInterestController } from './client-interest.controller';
import { ClientInterestService } from './client-interest.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/modules/client/entities/client.entity';

describe('ClientInterestController', () => {
  let controller: ClientInterestController;
  let service: ClientInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientInterestController],
      providers: [
        ClientInterestService,
        {
          provide: getRepositoryToken(ClientInterest),
          useClass: Repository, // Mock repository for ClientInterest
        },
        {
          provide: getRepositoryToken(Client),
          useClass: Repository, // Mock repository for Client
        },
      ],
    }).compile();

    controller = module.get<ClientInterestController>(ClientInterestController);
    service = module.get<ClientInterestService>(ClientInterestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
