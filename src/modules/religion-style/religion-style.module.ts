import { Module } from '@nestjs/common';
import { ReligionStyleService } from './religion-style.service';
import { ReligionStyleController } from './religion-style.controller';

@Module({
  controllers: [ReligionStyleController],
  providers: [ReligionStyleService],
})
export class ReligionStyleModule {}
