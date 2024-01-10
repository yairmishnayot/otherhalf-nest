import { Injectable } from '@nestjs/common';
import { CreateReligionStyleDto } from './dto/create-religion-style.dto';
import { UpdateReligionStyleDto } from './dto/update-religion-style.dto';

@Injectable()
export class ReligionStyleService {
  create(createReligionStyleDto: CreateReligionStyleDto) {
    return 'This action adds a new religionStyle';
  }

  findAll() {
    return `This action returns all religionStyle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} religionStyle`;
  }

  update(id: number, updateReligionStyleDto: UpdateReligionStyleDto) {
    return `This action updates a #${id} religionStyle`;
  }

  remove(id: number) {
    return `This action removes a #${id} religionStyle`;
  }
}
