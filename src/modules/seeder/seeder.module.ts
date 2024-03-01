import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { CityModule } from '../city/city.module';
import { RoleSeederService } from './role-seeder/role-seeder.service';
import { RoleModule } from '../role/role.module';
import { ProjectSeederService } from './projects-seeder/project-seeder/project-seeder.service';
import { ProjectModule } from '../project/project.module';
import { GroupModule } from '../group/group.module';
import { GroupSeederService } from './group-seeder/group-seeder/group-seeder.service';
import { EthnicitiesSeederService } from './ethnicities-seeder/ethnicities-seeder/ethnicities-seeder.service';
import { EthnicityModule } from '../ethnicity/ethnicity.module';
import { ReligionStyleModule } from '../religion-style/religion-style.module';
import { ReligionsStyleSeederService } from './religions-style-seeder/religions-style-seeder/religions-style-seeder.service';
import { ClientSeederService } from './client-seeder/client-seeder/client-seeder.service';
import { UserModule } from '../user/user.module';
import { UserGroupModule } from '../user-group/user-group.module';
import { UserSeederService } from './user-seeder/user-seeder.service';

@Module({
  imports: [
    CityModule,
    RoleModule,
    ProjectModule,
    UserModule,
    GroupModule,
    UserGroupModule,
    EthnicityModule,
    ReligionStyleModule,
  ],
  providers: [
    SeederService,
    CitySeederService,
    RoleSeederService,
    ProjectSeederService,
    GroupSeederService,
    EthnicitiesSeederService,
    ReligionsStyleSeederService,
    ClientSeederService,
    UserSeederService,
  ],
  exports: [SeederService],
})
export class SeederModule {}
