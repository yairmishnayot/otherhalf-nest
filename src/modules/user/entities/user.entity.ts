import { IsEmail, IsPhoneNumber } from 'class-validator';
import { UserGroup } from '../../user-group/entities/user-group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['email', 'phone'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 70,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 70,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  @Index('phone_index')
  @IsPhoneNumber()
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  canManageMoreClients: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  picture: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isFirstLogin: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastLoggedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user, {
    cascade: ['remove'],
  })
  userGroups: UserGroup[];
}
