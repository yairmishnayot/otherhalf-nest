import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseRequest } from 'src/common/types/BaseRequest';
import { UserService } from 'src/modules/user/user.service';
import { Roles } from 'src/enums';
import { Role } from 'src/modules/role/entities/role.entity';

@Injectable()
export class TeamLeadGuardGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: BaseRequest = context.switchToHttp().getRequest();

    // Allow admin everything
    if (request.user.isAdmin) {
      return true;
    }

    // Fetch the user from the database
    const user = await this.userService.findByEmail(request.user.email);
    if (!user) {
      return false;
    }

    // Check if the user has the ManagersTeamLead role
    return user.roles.some((role: Role) => role.id === Roles.ManagersTeamLead);
  }
}
