import { Test, TestingModule } from '@nestjs/testing';
import { ReligionStyleController } from './religion-style.controller';
import { ReligionStyleService } from './religion-style.service';

describe('ReligionStyleController', () => {
  let controller: ReligionStyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReligionStyleController],
      providers: [ReligionStyleService],
    }).compile();

    controller = module.get<ReligionStyleController>(ReligionStyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
