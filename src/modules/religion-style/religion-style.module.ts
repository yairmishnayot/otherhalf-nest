import { Module } from '@nestjs/common';
import { ReligionStyleService } from './religion-style.service';
import { ReligionStyleController } from './religion-style.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReligionStyle } from './entities/religion-style.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReligionStyle])],
  controllers: [ReligionStyleController],
  providers: [ReligionStyleService],
  exports: [TypeOrmModule],
})
export class ReligionStyleModule {}
