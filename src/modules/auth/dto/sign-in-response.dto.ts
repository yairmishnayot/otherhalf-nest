import { GetUserDto } from '../../user/dto/get-user.dto';

export class SignInResponseDto {
  token: string;
  refreshToken: string;
  user: GetUserDto;
}
