import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateClientInterestResponseDto {
  @IsNotEmpty()
  @IsArray()
  successfullyCreatedRecords: Array<>;

  @IsArray()
  failedRecordsClientIds: Array<number>;
}
