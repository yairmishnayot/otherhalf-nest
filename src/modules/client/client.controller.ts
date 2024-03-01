import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientInterestService } from '../client-interest/client-interest.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService,
     private readonly clientInterestService: ClientInterestService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('')
  findAll(@Req() req: Request) {
    return this.clientService.findAllForUser((req as any).user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.clientService.findOne(+id, (req as any).user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  @Get(':id/interests')
  getClientInterests(@Param('id') id: string) {
    return this.clientInterestService.findAllForClient(+id);
  }
}
