import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsIds } from 'src/enums/projectsIds.enum';
import { Group } from 'src/modules/group/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupSeederService {
  private readonly logger = new Logger(GroupSeederService.name);

  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding groups');

    const groups = [
      {
        name: 'הנהלה',
        startAgeRange: null,
        endAgeRange: null,
        projectId: null,
      },
      {
        name: 'צוות טכנולוגי',
        startAgeRange: null,
        endAgeRange: null,
        projectId: null,
      },
      {
        name: '18-22',
        startAgeRange: 18,
        endAgeRange: 22,
        projectId: ProjectsIds.OtherHalf,
      },
      {
        name: '23-27',
        startAgeRange: 23,
        endAgeRange: 27,
        projectId: ProjectsIds.OtherHalf,
      },
      {
        name: '28-32',
        startAgeRange: 28,
        endAgeRange: 32,
        projectId: ProjectsIds.OtherHalf,
      },
      {
        name: '33-40',
        startAgeRange: 33,
        endAgeRange: 40,
        projectId: ProjectsIds.OtherHalf,
      },
      {
        name: '41-65',
        startAgeRange: 41,
        endAgeRange: 65,
        projectId: ProjectsIds.OtherHalf,
      },
      {
        name: 'פרויקט אור',
        startAgeRange: 20,
        endAgeRange: 30,
        projectId: ProjectsIds.Or,
      },
      {
        name: 'פרויקט שח"ם',
        startAgeRange: 18,
        endAgeRange: 35,
        projectId: ProjectsIds.Shaham,
      },
    ];

    for (const group of groups) {
      const groupExists = await this.groupRepository.findOne({
        where: { name: group.name },
      });

      if (groupExists) {
        this.logger.log(`Group ${group.name} already exists. skipping...`);
      } else {
        await this.groupRepository.save(group);
      }
    }

    this.logger.log('Finished seeding groups');
  }
}
