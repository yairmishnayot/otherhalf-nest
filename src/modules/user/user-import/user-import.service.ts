import { User } from './../entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ImportUsersDTO } from '../dto/import-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/modules/role/entities/role.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';

@Injectable()
export class UserImportService {
  private readonly logger = new Logger(UserImportService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Group)
    private groupRepository: Repository<Group>,

    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,
  ) {}

  async importUsers(usersArray: ImportUsersDTO) {
    let importedUsersCount = 0;
    let skippedUsersCount = 0;

    // get all groups and roles from db, so that we don't have to query db for each user
    const roles = await this.roleRepository.find();
    const groups = await this.groupRepository.find();
    for (const user of usersArray.users) {
      // check if user in db, based on phone number
      // if yes, skip
      // if no, create user, then connect it to group and role
      const userExists = await this.userRepository.findOne({
        where: { phone: user.phone },
      });
      if (userExists) {
        this.logger.log(
          `User ${user.firstName} ${user.lastName} already exists. skipping...`,
        );
        skippedUsersCount++;
        continue;
      }
      user.password = await bcrypt.hash('123456', 10);
      user.email = user.email.toLowerCase().trim();

      // connecting user to group and role
      const role = roles.find((role) => role.name === user.role);

      if (!role) {
        this.logger.log(`Role ${user.role} not found. skipping...`);
        skippedUsersCount++;
        continue;
      }

      const group = groups.find((group) => group.name === user.group);

      if (!group) {
        this.logger.log(`Group ${user.group} not found. skipping...`);
        skippedUsersCount++;
        continue;
      }

      //saving user
      await this.userRepository.save(user);

      //saving user-group
      await this.userGroupRepository.save({
        user: user,
        group: group,
        role: role,
      });

      importedUsersCount++;
    }

    return {
      message: 'Finished importing users',
      impotredUsers: importedUsersCount,
      usersSkipped: skippedUsersCount,
    };
  }
}
