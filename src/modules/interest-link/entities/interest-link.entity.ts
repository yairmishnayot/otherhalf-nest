import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { IsNotEmpty, Length } from 'class-validator';

@Entity('interest_links')
export class InterestLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(10, 30)
  link: string;

  @OneToOne(() => Client, (client) => client.interestLink)
  @JoinColumn()
  client: Client;
}
