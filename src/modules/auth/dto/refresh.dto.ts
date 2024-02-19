import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
