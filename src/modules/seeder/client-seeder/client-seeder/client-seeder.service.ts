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

  /**
   * Choose the client's gender randomly
   * @returns The numeric value of the gender
   */
  private chooseGender(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  // generate random number between minAge and maxAge
  private chooseAge(minAge: number, maxAge: number): number {
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + this.minAge;
  }

  /**
   * Generate a random birthdate for the client based on the age
   * @param age - the age of the client
   * @returns the birthdate of the client
   */
  private generateBirthdate(age: number): Date {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - age;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return new Date(year, month, day);
  }

  /**
   * Choose the height of the client
   * @returns the height of the client
   */
  private chooseHeight(): number {
    return Math.random() * (2.1 - 1.5) + 1.5;
  }

  /**
   * Choose the first name of the client
   * @returns the first name of the client
   */
  private chooseFirstName(): string {
    if (this.gender === this.genderMale) {
      return faker.person.firstName('male');
    }
    return faker.person.firstName('female');
  }

  /**
   * Choose the start age range for the search
   * @param clientAge - the age of the client
   * @returns
   */
  private chooseStartAgeRangeSearch(clientAge: number): number {
    const startAge = this.chooseAge(clientAge - 5, clientAge + 5);
    return Math.max(startAge, this.minAge);
  }

  /**
   * Choose the end age range for the search
   * @param startAgeRange - the start age range
   * @returns
   */
  private chooseEndAgeRangeSearch(startAgeRange: number): number {
    const endAge = this.chooseAge(startAgeRange + 1, startAgeRange + 5);
    return Math.min(endAge, this.maxAge);
  }
}
