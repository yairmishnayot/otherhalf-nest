import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateClientInterestResponseDto {
  @IsNotEmpty()
  @IsArray()
  successfullyCreatedRecords: Array<any>;

  @IsArray()
  failedRecordsClientIds: Array<number>;
}
