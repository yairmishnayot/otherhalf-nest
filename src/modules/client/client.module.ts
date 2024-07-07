import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../user/entities/user.entity';
import { ClientInterestModule } from '../client-interest/client-interest.module';
import { ClientInterestService } from '../client-interest/client-interest.service';
import { InterestLink } from '../interest-link/entities/interest-link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, User, InterestLink]),
    ClientInterestModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientInterestService],
  exports: [TypeOrmModule],
})
export class ClientModule {}
