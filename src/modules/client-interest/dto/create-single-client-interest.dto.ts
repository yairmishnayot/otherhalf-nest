import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSingleClientInterestDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  interestedClientId: number;
}
