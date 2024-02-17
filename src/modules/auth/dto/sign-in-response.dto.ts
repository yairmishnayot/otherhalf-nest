import { User } from 'src/modules/user/entities/user.entity';

export class SignInResponseDto {
  token: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}
