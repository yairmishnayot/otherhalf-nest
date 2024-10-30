import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

// Mock dependencies
const mockUserService = {
  findByEmail: jest.fn(),
  findOne: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

const mockUserRepository = {
  save: jest.fn(),
};

const mockRefreshTokenRepository = {
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    delete: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  })),
};

// Mock bcrypt functions explicitly
jest.mock('bcryptjs', () => ({
  ...jest.requireActual('bcryptjs'),
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService - signIn', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    mockUserService.findByEmail.mockResolvedValue(null);

    await expect(
      authService.signIn('test@example.com', 'password'),
    ).rejects.toThrow(UnauthorizedException);
    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    mockUserService.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Properly mock bcrypt.compare

    await expect(
      authService.signIn('test@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'wrongpassword',
      mockUser.password,
    );
  });

  it('should sign in the user and return tokens if credentials are correct', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      lastLoggedAt: null,
    };
    const accessToken = 'accessToken';
    const refreshToken = 'refreshToken';

    mockUserService.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Properly mock bcrypt.compare
    mockUserRepository.save.mockResolvedValue(mockUser);
    jest.spyOn(authService, 'deleteRefreshTokensForUser').mockResolvedValue();
    jest
      .spyOn(authService, 'generateAccessToken')
      .mockResolvedValue(accessToken);
    jest
      .spyOn(authService, 'generateRefreshToken')
      .mockResolvedValue(refreshToken);

    const result = await authService.signIn('test@example.com', 'password');

    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('password', mockUser.password);
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ lastLoggedAt: expect.any(Date) }),
    );
    expect(authService.deleteRefreshTokensForUser).toHaveBeenCalledWith(
      mockUser.id,
    );
    expect(authService.generateAccessToken).toHaveBeenCalledWith(mockUser);
    expect(authService.generateRefreshToken).toHaveBeenCalledWith(mockUser);

    expect(result).toEqual({
      token: accessToken,
      refreshToken: refreshToken,
      user: mockUser,
    });
  });
});

describe('AuthService - resetPasswordUsingOldPassword', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    mockUserService.findOne.mockResolvedValue(null);

    await expect(
      authService.resetPasswordUsingOldPassword(
        {
          oldPassword: 'oldPass',
          newPassword: 'newPass',
          newPasswordConfirm: 'newPass',
        },
        1,
      ),
    ).rejects.toThrow(UnauthorizedException);
    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw UnauthorizedException if old password is incorrect', async () => {
    const mockUser = { id: 1, password: 'hashedPassword' };
    mockUserService.findOne.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Properly mock bcrypt.compare

    await expect(
      authService.resetPasswordUsingOldPassword(
        {
          oldPassword: 'wrongOldPass',
          newPassword: 'newPass',
          newPasswordConfirm: 'newPass',
        },
        1,
      ),
    ).rejects.toThrow(UnauthorizedException);
    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'wrongOldPass',
      mockUser.password,
    );
  });

  it('should reset the password if old password is correct', async () => {
    const mockUser = { id: 1, password: 'hashedPassword', isFirstLogin: true };
    mockUserService.findOne.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Properly mock bcrypt.compare
    (bcrypt.hash as jest.Mock).mockResolvedValue('newHashedPassword');

    await authService.resetPasswordUsingOldPassword(
      {
        oldPassword: 'oldPass',
        newPassword: 'newPass',
        newPasswordConfirm: 'newPass',
      },
      1,
    );

    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('oldPass', 'hashedPassword');
    expect(bcrypt.hash).toHaveBeenCalledWith('newPass', 10);
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      ...mockUser,
      password: 'newHashedPassword',
      isFirstLogin: false,
    });
  });
});
