import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { CitySeederService } from './city-seeder/city-seeder.service';
import { RoleSeederService } from './role-seeder/role-seeder.service';
import { ProjectSeederService } from './projects-seeder/project-seeder/project-seeder.service';
import { GroupSeederService } from './group-seeder/group-seeder/group-seeder.service';
import { UserSeederService } from './user-seeder/user-seeder.service';
import { EthnicitiesSeederService } from './ethnicities-seeder/ethnicities-seeder/ethnicities-seeder.service';
import { ReligionsStyleSeederService } from './religions-style-seeder/religions-style-seeder/religions-style-seeder.service';
import { ClientSeederService } from './client-seeder/client-seeder/client-seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: CitySeederService,
          useValue: {
            // Mock methods if necessary
          },
        },
        {
          provide: RoleSeederService,
          useValue: {},
        },
        {
          provide: ProjectSeederService,
          useValue: {},
        },
        {
          provide: GroupSeederService,
          useValue: {},
        },
        {
          provide: UserSeederService,
          useValue: {},
        },
        {
          provide: EthnicitiesSeederService,
          useValue: {},
        },
        {
          provide: ReligionsStyleSeederService,
          useValue: {},
        },
        {
          provide: ClientSeederService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
