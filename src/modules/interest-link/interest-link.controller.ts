import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterestLinkService } from './interest-link.service';
import { CreateInterestLinkDto } from './dto/create-interest-link.dto';
import { UpdateInterestLinkDto } from './dto/update-interest-link.dto';
import { ClientGuard } from '../client/guards/client/client.guard';

@Controller('interest-link')
export class InterestLinkController {
  constructor(private readonly interestLinkService: InterestLinkService) {}

  @UseGuards(ClientGuard)
  @Post('')
  create(@Body() createInterestLinkDto: CreateInterestLinkDto) {
    return this.interestLinkService.create(createInterestLinkDto);
  }

  @Get()
  findAll() {
    return this.interestLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestLinkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestLinkDto: UpdateInterestLinkDto,
  ) {
    return this.interestLinkService.update(+id, updateInterestLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestLinkService.remove(+id);
  }
}
