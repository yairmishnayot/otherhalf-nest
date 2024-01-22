import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReligionStyle } from 'src/modules/religion-style/entities/religion-style.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReligionsStyleSeederService {
  private readonly logger = new Logger(ReligionsStyleSeederService.name);

  constructor(
    @InjectRepository(ReligionStyle)
    private religionStyleRepository: Repository<ReligionStyle>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding religion styles');

    const religiousStyles = [
      'חרדי',
      'דתי לאומי תורני',
      'דתי לאומי',
      'חוזר בתשובה',
      'דתי לייט',
      'דתל"ש',
      'מסורתי',
      'חילוני',
    ];

    for (const religionStyle of religiousStyles) {
      const recordExists = await this.religionStyleRepository.findOne({
        where: { name: religionStyle },
      });

      if (recordExists) {
        this.logger.log(
          `Religion Style ${religionStyle} already exists. skipping...`,
        );
      } else {
        await this.religionStyleRepository.save({ name: religionStyle });
      }
    }

    this.logger.log('Finished seeding religion styles');
  }
}
