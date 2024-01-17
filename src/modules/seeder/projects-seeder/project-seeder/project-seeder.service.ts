import { Injectable, Logger } from '@nestjs/common';
import { Project } from 'src/modules/project/entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectSeederService {
  private readonly logger = new Logger(ProjectSeederService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding projects');
    this.logger.log('Finished seeding projects');
  }
}
