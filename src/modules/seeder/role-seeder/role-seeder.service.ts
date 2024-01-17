import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/role/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeederService {
  private readonly logger = new Logger(RoleSeederService.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding roles');

    const roles = [
      { name: 'CEO', hebrewName: 'מנכ"ל' },
      { name: 'Managers Team Lead', hebrewName: 'ראש צוות' },
      { name: 'Manager', hebrewName: 'מנהל' },
      { name: 'CFO', hebrewName: 'מנהל כספים' },
      { name: 'Operational Manager', hebrewName: 'מנהל תפעולי' },
      { name: 'Fundraising Manager', hebrewName: 'מנהל גיוס כספים' },
      { name: 'Marketing', hebrewName: 'שיווק' },
      { name: 'Team Member', hebrewName: 'חבר צוות' },
    ];

    for (const role of roles) {
      const entity = this.roleRepository.create({
        name: role.name,
        hebrewName: role.hebrewName,
      });

      await this.roleRepository.save(entity);
    }

    this.logger.log('Finished seeding roles');
  }
}
