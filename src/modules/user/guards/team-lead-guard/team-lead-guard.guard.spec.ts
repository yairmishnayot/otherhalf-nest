import { Test, TestingModule } from '@nestjs/testing';
import { TeamLeadGuardGuard } from './team-lead-guard.guard';
import { UserService } from 'src/modules/user/user.service';
import { Roles } from 'src/enums';
import { Role } from 'src/modules/role/entities/role.entity';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseRequest } from 'src/common/types/BaseRequest';

// Mock UserService
const mockUserService = {
  findByEmail: jest.fn(),
};

describe('TeamLeadGuardGuard', () => {
  let guard: TeamLeadGuardGuard;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamLeadGuardGuard,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    guard = module.get<TeamLeadGuardGuard>(TeamLeadGuardGuard);
    userService = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow admin users', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { isAdmin: true } }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should deny access if user is not found', async () => {
    mockUserService.findByEmail.mockResolvedValue(null);
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { email: 'test@example.com', isAdmin: false },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(false);
    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
  });

  it('should allow access if user has ManagersTeamLead role', async () => {
    mockUserService.findByEmail.mockResolvedValue({
      roles: [{ id: Roles.ManagersTeamLead }],
    });
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { email: 'test@example.com', isAdmin: false },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
  });

  it('should deny access if user does not have ManagersTeamLead role', async () => {
    mockUserService.findByEmail.mockResolvedValue({
      roles: [{ id: Roles.Manager }],
    });
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { email: 'test@example.com', isAdmin: false },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(false);
    expect(mockUserService.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
  });
});
