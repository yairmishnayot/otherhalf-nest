import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientInterestService } from './client-interest.service';
import { CreateClientInterestDto } from './dto/create-client-interest.dto';
import { UpdateClientInterestDto } from './dto/update-client-interest.dto';

@Controller('client-interest')
export class ClientInterestController {
  constructor(private readonly clientInterestService: ClientInterestService) {}

  @Post()
  create(@Body() createClientInterestDto: CreateClientInterestDto) {
    return this.clientInterestService.create(createClientInterestDto);
  }

  @Get()
  findAll() {
    return this.clientInterestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientInterestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientInterestDto: UpdateClientInterestDto,
  ) {
    return this.clientInterestService.update(+id, updateClientInterestDto);
  }
}
