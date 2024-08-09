import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { CreateClientInterestResponseDto } from './dto/create-client-interest-response.dto';
import { ClientInterestStatuses } from 'src/enums/client-interest-statuses.enum';
import { ProjectsIds } from '../../enums/projectsIds.enum';
import { Errors } from '../../enums/errors.enum';

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
      const createdClientInterest = await this.createSingleClientInterest(
        createClientInterestDto.clientId,
        interestedInClientId,
      );

      if (createdClientInterest) {
        successfullyCreatedRecords.push(createdClientInterest);
      } else {
        failedRecordsClientIds.push(interestedInClientId);
      }
    }

    return {
      successfullyCreatedRecords,
      failedRecordsClientIds,
    };
  }

  /**
   * Create a single client interest record
   * @param clientId
   * @param interestedInClientId
   * @returns Created client interest record or null if it failed
   */
  public async createSingleClientInterest(
    clientId: number,
    interestedInClientId: number,
  ): Promise<ClientInterest | null> {
    const client = await this.clientRepository.findOneBy({
      id: clientId,
    });

    const interestedClient = await this.clientRepository.findOne({
      where: { id: interestedInClientId },
      relations: ['user'],
    });

    // Check if there is a record with the same data
    const existingRecord = await this.clientInterestRepository.findOneBy({
      client: interestedClient,
      intrestedInClient: client,
    });

    if (existingRecord || client.id === interestedClient.id) {
      return null;
    }

    const clientInterest = this.clientInterestRepository.create({
      client: interestedClient,
      intrestedInClient: client,
    });
    await this.clientInterestRepository.save(clientInterest);

    return clientInterest;
  }

  /**
   * Create a single client interest record by client's phone
   * @param clientPhone
   * @param interestedInClientPhone
   * @returns Created client interest record or null if it failed
   */
  public async createClientInterestByPhone(
    clientPhone: string,
    interestedInClientPhone: string,
  ): Promise<ClientInterest | null> {
    const client = await this.clientRepository.findOne({
      where: { phone: interestedInClientPhone },
    });

    if (!client) {
      // We did not find the client that we want to add interest to
      throw new NotFoundException();
    }

    const interestedClient = await this.clientRepository.findOne({
      where: { phone: clientPhone },
    });
    if (!interestedClient) {
      // We did not find the client that is trying to interest
      throw new NotFoundException();
    }

    // Check if there is a record with the same data
    const existingRecord = await this.clientInterestRepository.findOneBy({
      client: interestedClient,
      intrestedInClient: client,
    });

    if (existingRecord) {
      throw new HttpException(
        {
          message:
            'It seems that there not enough data in the system to perform the action',
          code: Errors.CLIENT_NOT_FOUND,
        },
        500,
      );
    }

    if (client.id === interestedClient.id) {
      throw new HttpException(
        {
          message: 'Client cannot be interested in himself',
          code: Errors.CLIENT_INTEREST_IN_HIMSELF,
        },
        500,
      );
    }

    const clientInterest = this.clientInterestRepository.create({
      client: interestedClient,
      intrestedInClient: client,
    });
    await this.clientInterestRepository.save(clientInterest);

    return clientInterest;
  }

  findAll() {
    return `This action returns all clientInterest`;
  }

  /**
   * Find all interests in a specific client
   * @param clientId
   * @returns
   */
  findAllForClient(clientId: number) {
    return this.clientInterestRepository
      .createQueryBuilder('clients_interests')
      .innerJoinAndSelect('clients_interests.client', 'intrestedInClient')
      .innerJoinAndSelect('intrestedInClient.ethnicities', 'ethnicities')
      .innerJoinAndSelect('intrestedInClient.city', 'city')
      .innerJoinAndSelect('intrestedInClient.user', 'user')
      .innerJoinAndSelect('intrestedInClient.religionStyle', 'religionStyle')
      .where('clients_interests.intrestedInClient = :clientId', { clientId })
      .andWhere('clients_interests.status = :status', {
        status: ClientInterestStatuses.Waiting,
      })
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

  async changeStatus(id: number, status: ClientInterestStatuses) {
    const clientInterest = await this.clientInterestRepository.findOne({
      where: { id },
    });
    clientInterest.status = status;
    await this.clientInterestRepository.save(clientInterest);
    return clientInterest;
  }

  async delete(id: number) {
    await this.clientInterestRepository.delete(id);
    return `Client interest with id ${id} has been deleted`;
  }

  /**
   * Get a list of clients that are allowed to be interested in this client
   * @param clientId
   */
  async getAllowedClients(clientId: number) {
    const client = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
      relations: ['group', 'group.project'],
    });

    if (client.group.project.id === ProjectsIds.OtherHalf) {
      const relevantGroupIds = [
        client.group.id - 1,
        client.group.id,
        client.group.id + 1,
        9, // PROJECT SHAHAM ID
      ];

      // Use NOT EXISTS to exclude clients who have previously expressed interest in the given client
      const qb = this.clientRepository.createQueryBuilder('clients');

      return await qb
        .innerJoin('clients.group', 'groups')
        .innerJoinAndSelect('clients.user', 'user')
        .where('clients.gender <> :clientGender', {
          clientGender: client.gender,
        })
        .andWhere('groups.id IN (:...groupIds)', { groupIds: relevantGroupIds })
        .andWhere('groups.startAgeRange IS NOT NULL')
        .andWhere('groups.endAgeRange IS NOT NULL')
        .andWhere(
          `NOT EXISTS (
          SELECT 1
          FROM clients_interests clientInterest
          WHERE clientInterest.client_id = clients.id
          AND clientInterest.intrested_in_client_id = :intrestedInClientId
          AND clientInterest.status = :status
        )`,
        )
        .setParameter('intrestedInClientId', clientId)
        .setParameter('status', ClientInterestStatuses.Waiting)
        .orderBy('clients.firstName')
        .getMany();
    }

    return [];
  }
}
