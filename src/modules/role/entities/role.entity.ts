import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  hebrewName: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
