import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientInterestDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  interestedInClientId: number;
}
