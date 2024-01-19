import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { CityModule } from '../city/city.module';
import { RoleSeederService } from './role-seeder/role-seeder.service';
import { RoleModule } from '../role/role.module';
import { ProjectSeederService } from './projects-seeder/project-seeder/project-seeder.service';
import { ProjectModule } from '../project/project.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [CityModule, RoleModule, ProjectModule, GroupModule],
  providers: [
    SeederService,
    CitySeederService,
    RoleSeederService,
    ProjectSeederService,
  ],
  exports: [SeederService],
})
export class SeederModule {}
