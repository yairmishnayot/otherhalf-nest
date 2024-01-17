import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CitySeederService } from './city-seeder.service';

@Module({
  providers: [SeederService, CitySeederService],
  exports: [SeederService],
})
export class SeederModule {}
