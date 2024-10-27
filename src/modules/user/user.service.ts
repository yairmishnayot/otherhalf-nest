import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { RequestUser } from 'src/common/types/BaseRequest';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { Roles } from 'src/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(user: RequestUser) {
    if (user.isAdmin) {
      return this.userRepository.find({
        order: {
          id: 'ASC',
        },
      });
    } else {
      // Find the groups that this user is the team lead of
      const relevantGroupIdsForUser = await this.userGroupRepository
        .createQueryBuilder('userGroup')
        .innerJoin('userGroup.group', 'group') // Use inner join for a strict relationship match
        .where('userGroup.user.id = :userId', { userId: user.sub })
        .andWhere('userGroup.role.id = :roleId', {
          roleId: Roles.ManagersTeamLead,
        })
        .select('group.id') // Select only the group ID
        .getRawMany(); // Use getRawMany() to get plain result

      // Extracting the group IDs from the raw results
      const groupIds = relevantGroupIdsForUser.map((record) => record.group_id);

      if (groupIds.length === 0) {
        return [];
      }

      // Query to get users belonging to the relevant groups with the role of 'manager'
      const usersInRelevantGroups = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin('user.userGroups', 'userGroup')
        .where('userGroup.group.id IN (:...groupIds)', { groupIds })
        .andWhere('userGroup.role.id = :roleId', { roleId: Roles.Manager })
        .orderBy('user.id', 'ASC')
        .getMany();

      return usersInRelevantGroups;
    }
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userGroups', 'userGroups.role'], // Load userGroups and their roles
    });

    // Map the roles from userGroups into a separate array
    const roles = user.userGroups.map((userGroup) => userGroup.role);

    // Remove the `userGroups` field and attach the `roles` array to the user object
    const { userGroups, ...userWithoutGroups } = user;

    return {
      ...userWithoutGroups,
      roles, // Add the roles array here
    };
  }
}
