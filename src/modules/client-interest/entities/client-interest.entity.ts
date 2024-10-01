import { IsInt, Max, Min } from 'class-validator';
import { Client } from '../../client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ClientInterestStatuses } from '../../../enums/client-interest-statuses.enum';

@Entity('clients_interests')
@Unique(['client', 'interestedInClient'])
export class ClientInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'intrested_in_client_id' })
  interestedInClient: Client;

  @Column({ default: ClientInterestStatuses.Waiting })
  @IsInt()
  @Min(1)
  @Max(4)
  status: number;

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
