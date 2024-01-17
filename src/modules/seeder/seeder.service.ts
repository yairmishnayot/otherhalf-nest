import { Injectable } from '@nestjs/common';
import { CitySeederService } from './citySeeder/city-seeder.service';

@Injectable()
export class SeederService {
  constructor(private readonly citySeederService: CitySeederService) {}

  async seed() {
    await this.citySeederService.seed();
  }
}
