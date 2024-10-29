import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientInterestService } from '../client-interest/client-interest.service';

// Create a mock for the ClientRepository
const mockClientRepository = {
  // Mock any functions used by the service (e.g., find, save)
};

const mockClientInterestRepository = {};

describe('ClientController', () => {
  let controller: ClientController;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService,
        ClientInterestService,
        {
          provide: 'ClientRepository', // Provide the mock repository
          useValue: mockClientRepository,
        },
        {
          provide: 'ClientInterestRepository',
          useValue: mockClientInterestRepository,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
