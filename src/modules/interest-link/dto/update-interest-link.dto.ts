import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestLinkDto } from './create-interest-link.dto';

export class UpdateInterestLinkDto extends PartialType(CreateInterestLinkDto) {}
