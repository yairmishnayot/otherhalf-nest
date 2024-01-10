import { Injectable } from '@nestjs/common';
import { CreateEthnicityDto } from './dto/create-ethnicity.dto';
import { UpdateEthnicityDto } from './dto/update-ethnicity.dto';

@Injectable()
export class EthnicityService {
  create(createEthnicityDto: CreateEthnicityDto) {
    return 'This action adds a new ethnicity';
  }

  findAll() {
    return `This action returns all ethnicity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ethnicity`;
  }

  update(id: number, updateEthnicityDto: UpdateEthnicityDto) {
    return `This action updates a #${id} ethnicity`;
  }

  remove(id: number) {
    return `This action removes a #${id} ethnicity`;
  }
}
