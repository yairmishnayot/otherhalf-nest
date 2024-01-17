import { Injectable } from '@nestjs/common';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { RoleSeederService } from './role-seeder/role-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly citySeederService: CitySeederService,
    private readonly roleSeederService: RoleSeederService,
  ) {}

  async seed() {
    // await this.citySeederService.seed();
    await this.roleSeederService.seed();
  }
}
