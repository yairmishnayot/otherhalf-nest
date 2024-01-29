import { Injectable, Logger } from '@nestjs/common';
import { ImportUsersDTO } from '../dto/import-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserImportService {
  private readonly logger = new Logger(UserImportService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async importUsers(usersArray: ImportUsersDTO) {
    let importedUsersCount = 0;
    let skippedUsersCount = 0;
    for (const user of usersArray.users) {
      // check if user in db, based on phone number
      // if yes, skip
      // if no, create user, then connect it to group and role
      const userExists = await this.userRepository.findOne({
        where: { phone: user.phone },
      });
      if (userExists) {
        this.logger.log(
          `User ${user.first_name} ${user.last_name} already exists. skipping...`,
        );
        skippedUsersCount++;
        continue;
      }
      await this.userRepository.save(user);
      importedUsersCount++;
    }

    return {
      message: 'Finished importing users',
      impotredUsers: importedUsersCount,
      usersSkipped: skippedUsersCount,
    };
  }
}
