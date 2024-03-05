import { CreateClientInterestDto } from './../client-interest/dto/create-client-interest.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientInterestService } from '../client-interest/client-interest.service';
import { ClientGuard } from './guards/client/client.guard';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly clientInterestService: ClientInterestService,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('')
  findAll(@Req() req: Request) {
    return this.clientService.findAllForUser((req as any).user.sub);
  }

  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.clientService.findOne(+id, (req as any).user.sub);
  }

  @UseGuards(ClientGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @UseGuards(ClientGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  @UseGuards(ClientGuard)
  @Get(':id/interests')
  getClientInterests(@Param('id') id: string) {
    return this.clientInterestService.findAllForClient(+id);
  }

  @UseGuards(ClientGuard)
  @Post(':id/interests')
  createClientInterest(
    @Param('id') id: string,
    @Body() createClientInterestDto: CreateClientInterestDto,
  ) {
    return this.clientInterestService.create(createClientInterestDto);
  }
}
