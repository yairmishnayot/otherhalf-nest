import { Injectable } from '@nestjs/common';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { CreateClientInterestResponseDto } from './dto/create-client-interest-response.dto';

@Injectable()
export class ClientInterestService {
  constructor(
    @InjectRepository(ClientInterest)
    private clientInterestRepository: Repository<ClientInterest>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  /**
   *  Create a new client interest record
   * @param createClientInterestDto
   * @returns
   */
  async create(
    createClientInterestDto: CreateClientInterestDto,
  ): Promise<CreateClientInterestResponseDto> {
    // loop through the interestedClients array and create a record for each
    const successfullyCreatedRecords = [];
    const failedRecordsClientIds = [];

    for (const interestedInClientId of createClientInterestDto.interestedClients) {
      const client = await this.clientRepository.findOneBy({
        id: createClientInterestDto.clientId,
      });

      const intrestedClient = await this.clientRepository.findOneBy({
        id: interestedInClientId,
      });

      // Check if there is a record with the same data
      const existingRecord = await this.clientInterestRepository.findOneBy({
        client: intrestedClient,
        intrestedInClient: client,
      });

      if (existingRecord || client.id === intrestedClient.id) {
        failedRecordsClientIds.push(interestedInClientId);
        continue;
      }

      const clientInterest = this.clientInterestRepository.create({
        client: intrestedClient,
        intrestedInClient: client,
      });
      await this.clientInterestRepository.save(clientInterest);

      successfullyCreatedRecords.push(clientInterest);
    }

    return {
      successfullyCreatedRecords,
      failedRecordsClientIds,
    };
  }

  findAll() {
    return `This action returns all clientInterest`;
  }

  /**
   * Find all interests in a specific client
   * @param clientId
   * @returns
   */
  async findAllForClient(clientId: number) {
    return await this.clientInterestRepository
      .createQueryBuilder('clients_interests')
      .innerJoinAndSelect('clients_interests.client', 'intrestedInClient')
      .innerJoinAndSelect('intrestedInClient.user', 'user')
      .where('clients_interests.intrestedInClient = :clientId', { clientId })
      .getMany();
  }

  async findAllClientInterestsInOtherClients(clientId: number) {
    return await this.clientInterestRepository
      .createQueryBuilder('clients_interests')
      .innerJoinAndSelect('clients_interests.client', 'client')
      .where('clients_interests.client = :clientId', { clientId })
      .orderBy('clients_interests.createdAt')
      .getMany();
  }

  async findOne(id: number) {
    return await this.clientInterestRepository
      .createQueryBuilder('clients_interests')
      .innerJoinAndSelect('clients_interests.client', 'intrestedInClient')
      .innerJoinAndSelect('intrestedInClient.user', 'user')
      .where('clients_interests.id = :id', { id })
      .getOne();
  }

  update(id: number, updateClientInterestDto: UpdateClientInterestDto) {
    return `This action updates a #${id} clientInterest`;
  }

  async delete(id: number) {
    await this.clientInterestRepository.delete(id);
    return `Client interest with id ${id} has been deleted`;
  }
}
