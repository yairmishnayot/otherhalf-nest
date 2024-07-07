import { Test, TestingModule } from '@nestjs/testing';
import { InterestLinkController } from './interest-link.controller';
import { InterestLinkService } from './interest-link.service';

describe('InterestLinkController', () => {
  let controller: InterestLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestLinkController],
      providers: [InterestLinkService],
    }).compile();

    controller = module.get<InterestLinkController>(InterestLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
