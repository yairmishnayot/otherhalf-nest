import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInterestLinkDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;
}
