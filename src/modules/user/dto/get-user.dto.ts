import { Role } from '../../role/entities/role.entity';
import { Group } from '@/modules/group/entities/group.entity';
export class GetUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  canManageMoreClients: boolean;
  picture: string | null;
  isAdmin: boolean;
  isFirstLogin: boolean;
  status: boolean;
  lastLoggedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  groups: Group[];
}
