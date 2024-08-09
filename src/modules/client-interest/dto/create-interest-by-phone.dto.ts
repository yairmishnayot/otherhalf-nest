import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestByPhoneDto {
  @IsNotEmpty()
  @IsString()
  interestedClientPhone: string;
}
