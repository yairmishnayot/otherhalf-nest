import { Group } from 'src/modules/group/entities/group.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateUserGroupDto {
  user: User;
  role: Role;
  group: Group;
}
