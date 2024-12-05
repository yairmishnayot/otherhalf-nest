import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { RequestUser } from 'src/common/types/BaseRequest';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { Roles } from 'src/enums';
import * as bcrypt from 'bcryptjs';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if the user already exists by email or phone
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email or phone already exists',
      );
    }

    // Hash the password before saving (using phone as a placeholder)
    const passwordHash = await bcrypt.hash(createUserDto.phone, 10);

    // Create a new user entity instance
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: passwordHash, // Ensure password is securely stored
    });

    // Save the new user entity to the database
    return await this.userRepository.save(newUser);
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
      relations: ['userGroups', 'userGroups.role', 'userGroups.group'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(id: number, user: RequestUser) {
    if (user.isAdmin || (await this.isTeamLeadOfUser(user.sub, id))) {
      await this.clientRepository.update({ user: { id: id } }, { user: null });
      await this.userRepository.delete(id);
    } else {
      throw new ForbiddenException();
    }
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

  async isTeamLeadOfUser(teamLeadId: number, userId: number) {
    const teamLead = await this.findOne(teamLeadId);
    const user = await this.findOne(userId);
    let isTeamLeadOfUserFlag = false;

    if (!teamLead || !user) {
      return isTeamLeadOfUserFlag;
    }

    const teamLeadGroups = teamLead.userGroups;
    const userGroups = user.userGroups;

    // Go over the groups that has this team lead as a team lead, search if the user belongs to them
    const teamLeadTargetGroups = [];
    teamLeadGroups.forEach((teamLeadGroup) => {
      if (teamLeadGroup.role.id === Roles.ManagersTeamLead) {
        teamLeadTargetGroups.push(teamLeadGroup.group.id);
      }
    });

    userGroups.forEach((userGroup) => {
      if (
        userGroup.role.id === Roles.Manager &&
        teamLeadTargetGroups.includes(userGroup.group.id)
      ) {
        isTeamLeadOfUserFlag = true;
      }
    });

    return isTeamLeadOfUserFlag;
  }
}
