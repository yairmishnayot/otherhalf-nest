import { Module } from '@nestjs/common';
import { EthnicityService } from './ethnicity.service';
import { EthnicityController } from './ethnicity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ethnicity } from './entities/ethnicity.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ethnicity, Client])],
  controllers: [EthnicityController],
  providers: [EthnicityService],
  exports: [TypeOrmModule],
})
export class EthnicityModule {}
