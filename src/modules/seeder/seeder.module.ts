import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CitySeederService } from './citySeeder/city-seeder.service';
import { CityModule } from '../city/city.module';

@Module({
  imports: [CityModule],
  providers: [SeederService, CitySeederService],
  exports: [SeederService],
})
export class SeederModule {}
