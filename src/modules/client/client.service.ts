import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  /**
   * Get all clients for a given user id
   * @param userId
   * @returns {Promise<Client[]>}
   */
  async findAllForUser(userId: number): Promise<Client[]> {
    return await this.clientRepository
      .createQueryBuilder('client')
      .where('user_id = :userId', { userId })
      .innerJoinAndSelect('client.city', 'city')
      .innerJoinAndSelect('client.ethnicities', 'ethnicities')
      .innerJoinAndSelect('client.religionStyle', 'religionStyle')
      .getMany();
  }

  /**
   * Get a specific client if user is authorized
   * @param id
   * @returns {Promise<Client>}
   */
  async findOne(id: number, userId: number): Promise<Client> {
    const client: Client = await this.clientRepository.findOne({
      where: { id: id },
      relations: ['user', 'city', 'ethnicities', 'religionStyle'],
    });

    if (client.user.id !== userId) {
      throw new ForbiddenException('You can only view your clients');
    }
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
