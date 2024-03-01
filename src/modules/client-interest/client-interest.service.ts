import { Injectable } from '@nestjs/common';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientInterestService {
  constructor(
    @InjectRepository(ClientInterest)
    private clientInterestRepository: Repository<ClientInterest>,
  ) {}

  create(createClientInterestDto: CreateClientInterestDto) {
    return 'This action adds a new clientInterest';
  }

  findAll() {
    return `This action returns all clientInterest`;
  }

  findAllForClient(clientId: number) {
    return this.clientInterestRepository.find({
      where: { intrestedInClient: { id: clientId } },
    });
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
