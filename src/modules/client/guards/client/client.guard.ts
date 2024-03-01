import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.isAdmin) {
      return true;
    }

    const clientId = request.params.id;
    const clientCount = await this.clientRepository.count({
      where: { id: clientId, user: { id: user.sub } },
    });
    return clientCount > 1;
  }
}
