import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
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
