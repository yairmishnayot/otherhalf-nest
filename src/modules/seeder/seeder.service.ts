import { ClientSeederService } from './client-seeder/client-seeder/client-seeder.service';
import { ReligionsStyleSeederService } from './religions-style-seeder/religions-style-seeder/religions-style-seeder.service';
import { EthnicitiesSeederService } from './ethnicities-seeder/ethnicities-seeder/ethnicities-seeder.service';
import { ProjectSeederService } from './projects-seeder/project-seeder/project-seeder.service';
import { Injectable } from '@nestjs/common';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { RoleSeederService } from './role-seeder/role-seeder.service';
import { GroupSeederService } from './group-seeder/group-seeder/group-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly citySeederService: CitySeederService,
    private readonly roleSeederService: RoleSeederService,
    private readonly projectSeederService: ProjectSeederService,
    private readonly groupSeederService: GroupSeederService,
    private readonly ethnicitySeederService: EthnicitiesSeederService,
    private readonly religionsStyleSeederService: ReligionsStyleSeederService,
    private readonly clientSeederService: ClientSeederService,
  ) {}

  async seed() {
    // await this.citySeederService.seed();
    // await this.roleSeederService.seed();
    // await this.projectSeederService.seed();
    // await this.groupSeederService.seed();
    // await this.ethnicitySeederService.seed();
    // await this.religionsStyleSeederService.seed();
    await this.clientSeederService.seed();
  }
}
