import { IsEnum, IsNotEmpty } from 'class-validator';
import { ClientInterestStatuses } from 'src/enums/client-interest-statuses.enum';

export class changeClientInterestStatusDto {
  @IsNotEmpty()
  @IsEnum(ClientInterestStatuses)
  status: ClientInterestStatuses;
}
