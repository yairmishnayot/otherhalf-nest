import { User } from 'src/modules/user/entities/user.entity';

export class RefreshResponseDto {
  token: string;
  refreshToken: string;
  user: User;
}
