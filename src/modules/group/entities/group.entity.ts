import { IsIn, IsInt, IsOptional } from 'class-validator';
import { Project } from '../../project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.groups)
  project: Project;

  @Column({
    type: 'varchar',
    length: 70,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  startAgeRange: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  endAgeRange: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
