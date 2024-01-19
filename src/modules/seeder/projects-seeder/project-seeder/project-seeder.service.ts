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
    const projects = [
      { name: 'החצי השני' },
      { name: 'פרויקט שח״ם' },
      { name: 'פרויקט אור' },
    ];

    for (const project of projects) {
      const projectExists = await this.projectRepository.findOne({
        where: { name: project.name },
      });

      if (projectExists) {
        this.logger.log(`Project ${project.name} already exists. skipping...`);
      } else {
        await this.projectRepository.save(project);
      }
    }
    this.logger.log('Finished seeding projects');
  }
}
