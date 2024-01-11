import { IsEmail, IsPhoneNumber } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

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
    default: false,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertAndUpdateActions() {
    this.prepareEmail();
  }

  private prepareEmail(): void {
    this.email = this.email.toLowerCase().trim();
  }

  private async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
