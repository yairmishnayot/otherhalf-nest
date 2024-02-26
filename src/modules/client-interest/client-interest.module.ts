import { Module } from '@nestjs/common';
import { ClientInterestService } from './client-interest.service';
import { ClientInterestController } from './client-interest.controller';

@Module({
  controllers: [ClientInterestController],
  providers: [ClientInterestService],
})
export class ClientInterestModule {}
