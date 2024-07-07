import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterestLinkDto } from './dto/create-interest-link.dto';
import { UpdateInterestLinkDto } from './dto/update-interest-link.dto';
import { InterestLink } from './entities/interest-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import * as process from 'node:process';

@Injectable()
export class InterestLinkService {
  constructor(
    @InjectRepository(InterestLink)
    private interestLinkRepository: Repository<InterestLink>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createInterestLinkDto: CreateInterestLinkDto) {
    const existingInterestLink: InterestLink =
      await this.interestLinkRepository.findOne({
        where: { client: { id: createInterestLinkDto.clientId } },
      });
    if (existingInterestLink) {
      return existingInterestLink;
    } else {
      const client = await this.clientRepository.findOne({
        where: { id: createInterestLinkDto.clientId },
      });

      if (!client) {
        throw new Error('Client not found');
      }

      // create the interest link
      const newInterestLink: InterestLink = this.interestLinkRepository.create({
        link: this.generateLink(),
        client: client,
      });

      return await this.interestLinkRepository.save(newInterestLink);
    }
  }

  private generateLink() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = Math.floor(Math.random() * 21) + 10; // Random length between 10 and 30
    let slug = '';
    for (let i = 0; i < length; i++) {
      slug += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `${process.env.CLIENT_BASE_URL}/submit-interest?slug=${slug}`;
  }

  findAll() {
    return `This action returns all interestLink`;
  }

  async findOne(id: number): Promise<InterestLink> {
    return this.interestLinkRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async findByClientId(clientId: number): Promise<InterestLink> {
    const interestLink = await this.interestLinkRepository.findOne({
      where: { client: { id: clientId } },
      relations: ['client'],
    });

    if (!interestLink) {
      throw new NotFoundException(
        `InterestLink for Client with id ${clientId} not found`,
      );
    }

    return interestLink;
  }

  update(id: number, updateInterestLinkDto: UpdateInterestLinkDto) {
    return `This action updates a #${id} interestLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} interestLink`;
  }
}
