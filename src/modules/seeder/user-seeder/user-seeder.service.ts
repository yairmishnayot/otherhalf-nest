import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Group } from 'src/modules/group/entities/group.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { fakerHE as faker } from '@faker-js/faker';

@Injectable()
export class UserSeederService {
  private readonly logger = new Logger(UserSeederService.name);
  private generatedEmails: string[] = []; // To prevent duplicate emails

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Group)
    private groupRepository: Repository<Group>,

    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed(initialUsers: boolean = false, amountOfUsers: number = 0) {
    this.logger.log('Starting seeding users');
    if (initialUsers) {
      this.logger.log('Seeding initial users');
      let user = new User();
      user.email = 'admin@user.com';
      user.firstName = 'משתמש';
      user.lastName = 'אדמין';
      user.password = await bcrypt.hash('123456', 10);
      user.phone = '0000000000';
      user.isAdmin = true;
      user.isFirstLogin = false; // we don't want to force the admin to change the password

      await this.userRepository.save(user);

      const role = await this.roleRepository.findOne({ where: { id: 8 } }); // Regular Member
      const group = await this.groupRepository.findOne({ where: { id: 2 } }); // This is the technology group

      await this.userGroupRepository.save({ user, group, role });

      // creating a manager for each clients group(ids 3-9)
      for (let i = 3; i <= 9; i++) {
        user = new User();
        user.email = this.generateRandomEmail();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.password = await bcrypt.hash('123456', 10);
        user.phone = '0000000000';
        user.isAdmin = false;
        user.isFirstLogin = false; // we don't want to force the admin to change the password

        await this.userRepository.save(user);

        const role = await this.roleRepository.findOne({ where: { id: 3 } }); // Manager
        const group = await this.groupRepository.findOne({ where: { id: i } }); // The id of the relevant group

        await this.userGroupRepository.save({ user, group, role });
      }
    } else {
      // Creating users based on the amount of users
      for (let i = 0; i < amountOfUsers; i++) {
        await this.generateRandomUser();
      }
    }

    this.logger.log('Finished seeding users');
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

  private async generateRandomUser() {
    const user = new User();
    user.email = this.generateRandomEmail();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.password = await bcrypt.hash('123456', 10);
    user.phone = '0000000000';
    user.isAdmin = false;
    user.isFirstLogin = false; // we don't want to force the admin to change the password

    const groupId = Math.floor(Math.random() * (9 - 3 + 1));

    await this.userRepository.save(user);

    const role = await this.roleRepository.findOne({ where: { id: 3 } }); // Manager
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    }); // The id of the relevant group

    await this.userGroupRepository.save({ user, group, role });
  }
}
