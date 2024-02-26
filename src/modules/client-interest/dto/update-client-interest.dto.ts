import { PartialType } from '@nestjs/mapped-types';
import { CreateClientInterestDto } from './create-client-interest.dto';

export class UpdateClientInterestDto extends PartialType(CreateClientInterestDto) {}
