import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../user/entities/user.entity';
import { ClientInterestModule } from '../client-interest/client-interest.module';
import { ClientInterestService } from '../client-interest/client-interest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User]), ClientInterestModule],
  controllers: [ClientController],
  providers: [ClientService, ClientInterestService],
  exports: [TypeOrmModule],
})
export class ClientModule {}
