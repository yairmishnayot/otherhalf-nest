import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ethnicity } from 'src/modules/ethnicity/entities/ethnicity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EthnicitiesSeederService {
  private readonly logger = new Logger(EthnicitiesSeederService.name);

  constructor(
    @InjectRepository(Ethnicity)
    private ethnicityRepository = Repository<Ethnicity>,
  ) {}

  async seed() {}
}
