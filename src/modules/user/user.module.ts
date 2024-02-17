import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserImportService } from './user-import/user-import.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Group } from '../group/entities/group.entity';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Group, UserGroup, RefreshToken]),
  ],
  controllers: [UserController],
  providers: [UserService, UserImportService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
