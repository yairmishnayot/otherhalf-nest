import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/modules/city/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitySeederService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async seed() {
    const cities = ['אשדוד'];

    cities.forEach(async (city) => {
      const entity = this.cityRepository.create({
        name: city,
      });

      await this.cityRepository.save(entity);
    });
  }
}
