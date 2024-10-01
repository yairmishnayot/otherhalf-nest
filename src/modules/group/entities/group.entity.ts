import { IsInt, IsOptional } from 'class-validator';
import { Project } from '../../project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('groups')
@Unique(['name'])
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.groups)
  project: null | Project;

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
  startAgeRange: null | number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  endAgeRange: null | number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
