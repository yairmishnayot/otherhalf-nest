import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';

// Create mocks for the dependencies
const mockUserService = {
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockRefreshTokenRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService, // Mock UserService
        },
        {
          provide: JwtService,
          useValue: mockJwtService, // Mock JwtService
        },
        {
          provide: getRepositoryToken(User), // Mock UserRepository
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken), // Mock RefreshTokenRepository
          useValue: mockRefreshTokenRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
