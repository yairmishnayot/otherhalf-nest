import { IsArray, IsNotEmpty } from 'class-validator';
import { ClientInterest } from '../entities/client-interest.entity';

export class CreateClientInterestResponseDto {
  @IsNotEmpty()
  @IsArray()
  successfullyCreatedRecords: Array<ClientInterest>;

  @IsArray()
  failedRecordsClientIds: Array<number>;
}
