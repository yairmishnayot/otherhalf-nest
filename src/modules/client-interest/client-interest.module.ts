import { Module } from '@nestjs/common';
import { ClientInterestService } from './client-interest.service';
import { ClientInterestController } from './client-interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientInterest, Client])],
  controllers: [ClientInterestController],
  providers: [ClientInterestService],
  exports: [TypeOrmModule],
})
export class ClientInterestModule {}
