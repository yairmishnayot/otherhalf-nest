import { IsEmail, IsPhoneNumber } from 'class-validator';
import { UserGroup } from '../../user-group/entities/user-group.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
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
    precision: 0,
    nullable: true,
  })
  lastLoggedAt: Date;

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

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user, {
    cascade: ['remove'],
  })
  userGroups: UserGroup[];

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: ['remove'],
  })
  refreshToken: RefreshToken;
}
