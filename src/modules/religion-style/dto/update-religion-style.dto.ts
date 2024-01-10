import { PartialType } from '@nestjs/mapped-types';
import { CreateReligionStyleDto } from './create-religion-style.dto';

export class UpdateReligionStyleDto extends PartialType(CreateReligionStyleDto) {}
