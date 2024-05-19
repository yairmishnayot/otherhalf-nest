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
import { changeClientInterestStatusDto } from '../client-interest/dto/change-client-interest-status.dto';

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
  @Get(':id/interests/:interestId')
  getClientInterest(@Param('interestId') interestId: string) {
    return this.clientInterestService.findOne(+interestId);
  }

  @UseGuards(ClientGuard)
  @Post(':id/interests/:interestId/status')
  changeClientInterestStatus(
    @Param('interestId') interestId: string,
    @Body() data: changeClientInterestStatusDto,
  ) {
    return this.clientInterestService.changeStatus(+interestId, data.status);
  }

  @UseGuards(ClientGuard)
  @Post(':id/interests')
  createClientInterest(
    @Param('id') id: string,
    @Body() createClientInterestDto: CreateClientInterestDto,
  ) {
    return this.clientInterestService.create(createClientInterestDto);
  }

  @UseGuards(ClientGuard)
  @Get(':id/interests-in-others')
  async getClientInterestsInOthers(@Param('id') id: string) {
    return await this.clientInterestService.findAllClientInterestsInOtherClients(
      +id,
    );
  }

  @UseGuards(ClientGuard)
  @Delete(':id/interests/:interestId')
  async delete(@Param('interestId') interestId: string) {
    return await this.clientInterestService.delete(+interestId);
  }

  @UseGuards(ClientGuard)
  @Get(':id/allowed-interests')
  async getClientsThatCanInterestInClient(@Param('id') id: string) {
    return await this.clientInterestService.getAllowedClients(+id);
  }
}
