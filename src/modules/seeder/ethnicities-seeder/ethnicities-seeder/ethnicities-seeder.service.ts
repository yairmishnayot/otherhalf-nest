import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ethnicity } from '@/modules/ethnicity/entities/ethnicity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EthnicitiesSeederService {
  private readonly logger = new Logger(EthnicitiesSeederService.name);

  constructor(
    @InjectRepository(Ethnicity)
    private ethnicityRepository: Repository<Ethnicity>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding ethnicities');

    const ethnicities = [
      'אשכנזי/ה',
      'תימני/ה',
      'מרוקאי/ת',
      'הודי/ת',
      'עיראקי/ת',
      'פרסי/ה',
      'פולני/ה',
      'אתיופי/ת',
      'הונגרי/ה',
      'טריפוליטאי/ת',
      'כורדי/ה',
      'ספרדי/ה',
      'רוסי/ה',
      'תוניסאי/ת',
      'אמריקאי/ת',
      'גרוזיני/ת',
    ];

    for (const ethnicity of ethnicities) {
      const ethnicityExists = await this.ethnicityRepository.findOne({
        where: { name: ethnicity },
      });

      if (ethnicityExists) {
        this.logger.log(`Ethnicity ${ethnicity} already exists. skipping...`);
      } else {
        await this.ethnicityRepository.save({ name: ethnicity });
      }
    }

    this.logger.log('Finished seeding ethnicities');
  }
}
