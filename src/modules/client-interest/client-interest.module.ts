import { Module } from '@nestjs/common';
import { ClientInterestService } from './client-interest.service';
import { ClientInterestController } from './client-interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientInterest])],
  controllers: [ClientInterestController],
  providers: [ClientInterestService],
  exports: [TypeOrmModule],
})
export class ClientInterestModule {}
