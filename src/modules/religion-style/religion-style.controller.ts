import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReligionStyleService } from './religion-style.service';
import { CreateReligionStyleDto } from './dto/create-religion-style.dto';
import { UpdateReligionStyleDto } from './dto/update-religion-style.dto';

@Controller('religion-style')
export class ReligionStyleController {
  constructor(private readonly religionStyleService: ReligionStyleService) {}

  @Post()
  create(@Body() createReligionStyleDto: CreateReligionStyleDto) {
    return this.religionStyleService.create(createReligionStyleDto);
  }

  @Get()
  findAll() {
    return this.religionStyleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.religionStyleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReligionStyleDto: UpdateReligionStyleDto) {
    return this.religionStyleService.update(+id, updateReligionStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.religionStyleService.remove(+id);
  }
}
