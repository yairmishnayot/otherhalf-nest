import { fakerHE as faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Gender,
  RelationshipGoal,
  RelationshipStatus,
  ReligionStyles,
  Roles,
  ShabbathKosher,
  ShmiratNegia,
} from 'src/enums';
import { ProjectsIds } from 'src/enums/projectsIds.enum';
import { City } from 'src/modules/city/entities/city.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { Ethnicity } from 'src/modules/ethnicity/entities/ethnicity.entity';
import { ReligionStyle } from 'src/modules/religion-style/entities/religion-style.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientSeederService {
  private readonly logger: Logger = new Logger(ClientSeederService.name);
  private genderMale: number = Gender.Male;
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
  private generatedEmails: string[] = []; // To prevent duplicate emails
  private generatedPhones: string[] = []; // To prevent duplicate phones

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,

    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    @InjectRepository(ReligionStyle)
    private readonly religionStyleRepository: Repository<ReligionStyle>,

    @InjectRepository(Ethnicity)
    private readonly ethnicityRepository: Repository<Ethnicity>,
  ) {}

  async seed(numOfClients: number = 1) {
    this.logger.log('Starting seeding clients');

    // Get religion style
    const religionStyle = await this.religionStyleRepository.findOneOrFail({
      where: { id: this.religionStyleId },
    });

    for (let i = 0; i < numOfClients; i++) {
      const age = this.chooseRandomAge(this.minAge, this.maxAge);
      const user = await this.chooseRandomUserByClientAgeAndProjectId(
        age,
        this.projectId,
      );

      this.gender = this.chooseGender();

      const client = this.clientRepository.create({
        firstName: this.chooseFirstName(),
        lastName: faker.person.lastName(),
        email: this.generateRandomEmail(),
        gender: this.gender,
        phone: this.generateIsraeliPhoneNumber(),
        relationshipStatus: RelationshipStatus.Single,
        relationshipGoal: RelationshipGoal.Wedding,
        shabbathKosher: ShabbathKosher.Yes,
        doesShomerNegia: ShmiratNegia.Yes,
        age,
        birthDate: this.generateBirthdate(age),
        height: this.chooseHeight(),
        family: this.familyText,
        education: this.education,
        service: this.service,
        currentlyDoing: this.currentlyDoing,
        aboutMe: this.aboutMe,
        lookingFor: this.lookingFor,
        startAgeRangeSearch: this.chooseStartAgeRangeSearch(age),
        endAgeRangeSearch: this.chooseEndAgeRangeSearch(
          this.chooseStartAgeRangeSearch(age),
        ),
        doesWantAdvertisement: Boolean(Math.round(Math.random())), // Randomly choose if the client wants to receive advertisements
      });

      client.user = user;
      client.group = user.userGroups[0].group;
      client.city = await this.chooseRandomCity();
      client.religionStyle = religionStyle;
      client.ethnicities = await this.chooseRandomEthnicities();
      await this.clientRepository.save(client);
    }

    this.logger.log('Finished seeding clients');
  }

  /**
   * Generate a random israeli phone number
   * @returns {string} a random israeli phone number
   */
  private generateIsraeliPhoneNumber(): string {
    const prefixes = ['050', '052', '054', '055', '058'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, '0');
    const phone = prefix + suffix;

    if (this.generatedPhones.includes(phone)) {
      return this.generateIsraeliPhoneNumber();
    }

    this.generatedPhones.push(phone);
    return phone;
  }

  // write a function that will generate a random email witoout duplicates
  private generateRandomEmail(): string {
    const email = faker.internet.email();
    if (this.generatedEmails.includes(email)) {
      return this.generateRandomEmail();
    }

    this.generatedEmails.push(email);
    return email;
  }

  /**
   *  Choose a random city
   * @returns {City} a random city
   */
  private async chooseRandomCity() {
    return await this.cityRepository
      .createQueryBuilder('city')
      .orderBy('RANDOM()')
      .getOne();
  }

  /**
   * Choose the client's gender randomly
   * @returns The numeric value of the gender
   */
  private chooseGender(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  // generate random number between minAge and maxAge
  private chooseRandomAge(minAge: number, maxAge: number): number {
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + this.minAge;
  }

  /**
   * Choose a random user by the client's age and project id
   * @param age
   * @param projectId
   * @returns
   */
  private async chooseRandomUserByClientAgeAndProjectId(
    age: number,
    projectId: number,
  ) {
    return await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.userGroups', 'userGroup')
      .innerJoinAndSelect('userGroup.group', 'group')
      .where('userGroup.role_id = :roleId', { roleId: this.managerRoleId })
      .andWhere('group.projectId = :projectId', { projectId })
      .andWhere('group.startAgeRange <= :age', { age })
      .andWhere('group.endAgeRange >= :age', { age })
      .orderBy('RANDOM()')
      .getOne();
  }

  // write a function that will fetch random number of ethnicities from DB, the number will be between 1 and 4
  private async chooseRandomEthnicities() {
    const numOfEthnicities = Math.floor(Math.random() * 4) + 1;
    return await this.ethnicityRepository
      .createQueryBuilder('ethnicity')
      .orderBy('RANDOM()')
      .limit(numOfEthnicities)
      .getMany();
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
    const startAge = this.chooseRandomAge(clientAge - 5, clientAge + 5);
    return Math.max(startAge, this.minAge);
  }

  /**
   * Choose the end age range for the search
   * @param startAgeRange - the start age range
   * @returns
   */
  private chooseEndAgeRangeSearch(startAgeRange: number): number {
    const endAge = this.chooseRandomAge(startAgeRange + 1, startAgeRange + 5);
    return Math.min(endAge, this.maxAge);
  }
}
