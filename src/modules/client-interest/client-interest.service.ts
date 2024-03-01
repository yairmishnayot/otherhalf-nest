import { Injectable } from '@nestjs/common';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';

@Injectable()
export class ClientInterestService {
  create(createClientInterestDto: CreateClientInterestDto) {
    return 'This action adds a new clientInterest';
  }

  findAll() {
    return `This action returns all clientInterest`;
  }

  findAllForClient(clientId: number){
    return `This action returns all clientInterest for client ${clientId}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientInterest`;
  }

  update(id: number, updateClientInterestDto: UpdateClientInterestDto) {
    return `This action updates a #${id} clientInterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientInterest`;
  }
}
