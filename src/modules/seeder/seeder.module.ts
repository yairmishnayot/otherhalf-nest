import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { CityModule } from '../city/city.module';
import { RoleSeederService } from './role-seeder/role-seeder.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [CityModule, RoleModule],
  providers: [SeederService, CitySeederService, RoleSeederService],
  exports: [SeederService],
})
export class SeederModule {}
