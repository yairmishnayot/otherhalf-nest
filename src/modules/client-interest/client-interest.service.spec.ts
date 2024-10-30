import { Test, TestingModule } from '@nestjs/testing';
import { ClientInterestService } from './client-interest.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientInterest } from './entities/client-interest.entity';
import { Client } from '../client/entities/client.entity';
import { HttpException } from '@nestjs/common';
import { ClientInterestStatuses } from '@/enums/client-interest-statuses.enum';
import { ProjectsIds } from 'src/enums/projectsIds.enum';

// Mock dependencies
const mockClientInterestRepository = {
  save: jest.fn(),
  create: jest.fn(),
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([{}]),
    getOne: jest.fn().mockResolvedValue({}),
  })),
};

const mockClientRepository = {
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    innerJoin: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    setParameter: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([{}]),
  })),
};

describe('ClientInterestService', () => {
  let service: ClientInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientInterestService,
        {
          provide: getRepositoryToken(ClientInterest),
          useValue: mockClientInterestRepository,
        },
        { provide: getRepositoryToken(Client), useValue: mockClientRepository },
      ],
    }).compile();

    service = module.get<ClientInterestService>(ClientInterestService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create client interest records for each interested client', async () => {
      const createClientInterestDto = {
        clientId: 1,
        interestedClients: [2, 3],
      };
      jest
        .spyOn(service, 'createSingleClientInterest')
        .mockResolvedValueOnce({} as any)
        .mockResolvedValueOnce(null);

      const result = await service.create(createClientInterestDto);

      expect(result.successfullyCreatedRecords.length).toBe(1);
      expect(result.failedRecordsClientIds.length).toBe(1);
      expect(service.createSingleClientInterest).toHaveBeenCalledTimes(2);
    });
  });

  describe('createSingleClientInterest', () => {
    it('should create a single client interest record if valid', async () => {
      mockClientRepository.findOneBy.mockResolvedValue({ id: 1 });
      mockClientRepository.findOne.mockResolvedValue({ id: 2, user: {} });
      mockClientInterestRepository.findOneBy.mockResolvedValue(null);
      mockClientInterestRepository.create.mockReturnValue({});

      const result = await service.createSingleClientInterest(1, 2);

      expect(result).not.toBeNull();
      expect(mockClientRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockClientRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
        relations: ['user'],
      });
      expect(mockClientInterestRepository.findOneBy).toHaveBeenCalledWith({
        client: { id: 2, user: {} },
        intrestedInClient: { id: 1 },
      });
      expect(mockClientInterestRepository.save).toHaveBeenCalled();
    });

    it('should return null if client interest already exists or client is interested in themselves', async () => {
      mockClientRepository.findOneBy.mockResolvedValue({ id: 1 });
      mockClientRepository.findOne.mockResolvedValue({ id: 1, user: {} });

      const result = await service.createSingleClientInterest(1, 1);

      expect(result).toBeNull();
    });
  });

  describe('createClientInterestByPhone', () => {
    it('should throw an exception if a client is not found by phone', async () => {
      mockClientRepository.findOne.mockResolvedValue(null);

      await expect(
        service.createClientInterestByPhone('123', '456'),
      ).rejects.toThrow(HttpException);
      expect(mockClientRepository.findOne).toHaveBeenCalledWith({
        where: { phone: '456' },
      });
    });

    it('should throw an exception if client interest already exists', async () => {
      mockClientRepository.findOne.mockResolvedValue({ id: 1 });
      mockClientInterestRepository.findOneBy.mockResolvedValue({});

      await expect(
        service.createClientInterestByPhone('123', '456'),
      ).rejects.toThrow(HttpException);
      expect(mockClientInterestRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('findAllForClient', () => {
    it('should return all interests in a specific client', async () => {
      mockClientInterestRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue([{}]);

      const result = await service.findAllForClient(1);

      expect(result).toEqual([{}]);
      expect(
        mockClientInterestRepository.createQueryBuilder,
      ).toHaveBeenCalled();
    });
  });

  describe('findAllClientInterestsInOtherClients', () => {
    it('should return all client interests in other clients', async () => {
      mockClientInterestRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue([{}]);

      const result = await service.findAllClientInterestsInOtherClients(1);

      expect(result).toEqual([{}]);
      expect(
        mockClientInterestRepository.createQueryBuilder,
      ).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single client interest by id', async () => {
      mockClientInterestRepository
        .createQueryBuilder()
        .getOne.mockResolvedValue({});

      const result = await service.findOne(1);

      expect(result).toEqual({});
      expect(
        mockClientInterestRepository.createQueryBuilder,
      ).toHaveBeenCalled();
    });
  });

  describe('changeStatus', () => {
    it('should change the status of a client interest', async () => {
      mockClientInterestRepository.findOne.mockResolvedValue({
        id: 1,
        status: ClientInterestStatuses.Waiting,
      });

      const result = await service.changeStatus(
        1,
        ClientInterestStatuses.Dating,
      );

      expect(result.status).toBe(ClientInterestStatuses.Dating);
      expect(mockClientInterestRepository.save).toHaveBeenCalledWith(result);
    });
  });

  describe('delete', () => {
    it('should delete a client interest by id', async () => {
      const result = await service.delete(1);

      expect(result).toBe('Client interest with id 1 has been deleted');
      expect(mockClientInterestRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllowedClients', () => {
    it('should return allowed clients for a specific client', async () => {
      mockClientRepository.findOne.mockResolvedValue({
        id: 1,
        group: { id: 2, project: { id: ProjectsIds.OtherHalf } },
        gender: 'male',
      });
      mockClientRepository.createQueryBuilder().getMany.mockResolvedValue([{}]);

      const result = await service.getAllowedClients(1);

      expect(result).toEqual([{}]);
      expect(mockClientRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
