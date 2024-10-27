import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserImportService } from './user-import/user-import.service';
import { ImportUsersDTO } from './dto/import-users.dto';
import { TeamLeadGuardGuard } from 'src/modules/user/guards/team-lead-guard/team-lead-guard.guard';
import { BaseRequest } from 'src/common/types/BaseRequest';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userImportService: UserImportService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('import')
  async import(@Body() importUsersDto: ImportUsersDTO): Promise<any> {
    return await this.userImportService.importUsers(importUsersDto);
  }

  @Get('')
  @UseGuards(TeamLeadGuardGuard)
  findAll(@Req() req: BaseRequest) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
