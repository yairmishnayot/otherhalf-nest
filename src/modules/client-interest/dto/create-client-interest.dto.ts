import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientInterestDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsArray()
  interestedClients: Array<number>;
}
