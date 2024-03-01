import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Group } from 'src/modules/group/entities/group.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Injectable()
export class UserSeederService {
  private readonly logger = new Logger(UserSeederService.name);

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

  async seed() {
    this.logger.log('Starting seeding users');
    const user = new User();
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

    this.logger.log('Finished seeding users');
  }
}
