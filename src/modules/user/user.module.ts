import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserImportService } from './user-import/user-import.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserImportService],
})
export class UserModule {}
