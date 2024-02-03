import { fakerHE as faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, ReligionStyles, Roles } from 'src/enums';
import { ProjectsIds } from 'src/enums/projectsIds.enum';
import { Client } from 'src/modules/client/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientSeederService {
  private readonly logger: Logger = new Logger(ClientSeederService.name);
  private genderMale: number = Gender.Male;
  private genderFemale: number = Gender.Female;
  private managerRoleId: number = Roles.Manager;
  private minAge: number = 18;
  private maxAge: number = 65;
  private projectId: number = ProjectsIds.OtherHalf;
  private familyText: string = 'מידע על המשפחה';
  private education: string = 'מידע על ההשכלה';
  private service: string = 'מידע על השירות הצבאי/לאומי';
  private currentlyDoing: string = 'מה אני עושה כרגע';
  private aboutMe: string = 'קצת עלי';
  private lookingFor: string = 'מה אני מחפש/ת';
  private religionStyleId = ReligionStyles.DatiLeumi;

  private gender: number; // That will be the random generated gender

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding clients');
    console.log(faker.person.firstName());
    console.log(faker.person.lastName());
  }
}
