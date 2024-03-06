import { Injectable } from '@nestjs/common';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class ClientInterestService {
  constructor(
    @InjectRepository(ClientInterest)
    private clientInterestRepository: Repository<ClientInterest>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(
    createClientInterestDto: CreateClientInterestDto,
  ): Promise<ClientInterest> {
    try {
      const client = await this.clientRepository.findOneBy({
        id: createClientInterestDto.clientId,
      });
      const intrestedInClient = await this.clientRepository.findOneBy({
        id: createClientInterestDto.interestedInClientId,
      });
      const clientInterest = this.clientInterestRepository.create({
        client,
        intrestedInClient,
      });

      return await this.clientInterestRepository.save(clientInterest);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('duplicated record');
      }
      throw error;
    }
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
