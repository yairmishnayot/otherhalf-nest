import { Test, TestingModule } from '@nestjs/testing';
import { EthnicityController } from './ethnicity.controller';
import { EthnicityService } from './ethnicity.service';

describe('EthnicityController', () => {
  let controller: EthnicityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthnicityController],
      providers: [EthnicityService],
    }).compile();

    controller = module.get<EthnicityController>(EthnicityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
