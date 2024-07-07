import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestLinkService } from './interest-link.service';
import { InterestLinkController } from './interest-link.controller';
import { InterestLink } from './entities/interest-link.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestLink, Client])],
  providers: [InterestLinkService],
  controllers: [InterestLinkController],
})
export class InterestLinkModule {}
