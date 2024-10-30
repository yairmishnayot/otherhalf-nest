import { ClientGuard } from './client.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '@/modules/client/entities/client.entity';
import { Repository } from 'typeorm';
import { ExecutionContext } from '@nestjs/common';

describe('ClientGuard', () => {
  let guard: ClientGuard;
  let clientRepository: jest.Mocked<Repository<Client>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientGuard,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<ClientGuard>(ClientGuard);
    clientRepository = module.get(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access if user is an admin', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: true },
          params: { id: '1' },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should allow access if client belongs to user', async () => {
    clientRepository.count.mockResolvedValue(1); // Mock that the client exists for this user

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, sub: 'user-id' },
          params: { id: 'client-id' },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
    expect(clientRepository.count).toHaveBeenCalledWith({
      where: { id: 'client-id', user: { id: 'user-id' } },
    });
  });

  it('should deny access if client does not belong to user', async () => {
    clientRepository.count.mockResolvedValue(0); // Mock that the client does not exist for this user

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, sub: 'user-id' },
          params: { id: 'client-id' },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(false);
    expect(clientRepository.count).toHaveBeenCalledWith({
      where: { id: 'client-id', user: { id: 'user-id' } },
    });
  });
});
