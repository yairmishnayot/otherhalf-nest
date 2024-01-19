import { Module } from '@nestjs/common';
import { EthnicityService } from './ethnicity.service';
import { EthnicityController } from './ethnicity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ethnicity } from './entities/ethnicity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ethnicity])],
  controllers: [EthnicityController],
  providers: [EthnicityService],
  exports: [TypeOrmModule],
})
export class EthnicityModule {}
