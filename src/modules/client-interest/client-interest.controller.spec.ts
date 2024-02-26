import { Test, TestingModule } from '@nestjs/testing';
import { ClientInterestController } from './client-interest.controller';
import { ClientInterestService } from './client-interest.service';

describe('ClientInterestController', () => {
  let controller: ClientInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientInterestController],
      providers: [ClientInterestService],
    }).compile();

    controller = module.get<ClientInterestController>(ClientInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
