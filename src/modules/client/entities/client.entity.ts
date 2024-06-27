import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsDecimal,
  IsString,
} from 'class-validator';

// Entities
import { Group } from '../../group/entities/group.entity';
import { User } from '../../user/entities/user.entity';
import { City } from '../../city/entities/city.entity';
import { ReligionStyle } from '../../religion-style/entities/religion-style.entity';
import { Ethnicity } from '../../ethnicity/entities/ethnicity.entity';

// Enums
import {
  Gender,
  RelationshipStatus,
  RelationshipGoal,
  ShmiratNegia,
  ShabbathKosher,
  ClientStatuses,
} from '../../../enums';

@Entity('clients')
@Unique(['phone', 'email'])
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @IsOptional()
  user?: User;

  @Column('char', { length: 50 })
  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @Column('char', { length: 50 })
  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @Column('char', { length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column('char', { length: 17, unique: true })
  @IsPhoneNumber()
  phone: string;

  @Column('enum', { enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @Column('enum', { enum: RelationshipStatus })
  @IsEnum(RelationshipStatus)
  relationshipStatus: RelationshipStatus;

  @Column({ default: 0 })
  @IsInt()
  amountOfKids: number;

  @Column('enum', { enum: RelationshipGoal })
  @IsEnum(RelationshipGoal)
  relationshipGoal: RelationshipGoal;

  @Column({ nullable: true })
  customEthnicity?: string;

  @Column('date')
  birthDate: Date;

  @Column()
  @IsInt()
  age: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsDecimal()
  height: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column('enum', { enum: ShabbathKosher })
  @IsEnum(ShabbathKosher)
  shabbathKosher: ShabbathKosher;

  @ManyToOne(() => ReligionStyle)
  @JoinColumn({ name: 'religion_style_id' })
  @IsOptional()
  religionStyle?: ReligionStyle;

  @Column('char', { length: 100, nullable: true })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  customReligionStyle?: string;

  @Column()
  family: string;

  @Column()
  service: string;

  @Column('text', { nullable: true })
  education?: string;

  @Column('text')
  @IsString()
  @Length(1, 1000)
  currentlyDoing: string;

  @Column('text')
  @IsString()
  @Length(1, 1000)
  aboutMe: string;

  @Column('text')
  @IsString()
  @Length(1, 1000)
  lookingFor: string;

  @Column()
  @IsInt()
  @Min(18)
  @Max(65)
  startAgeRangeSearch: number;

  @Column()
  @IsInt()
  @Min(18)
  @Max(65)
  endAgeRangeSearch: number;

  @Column('boolean', { default: false })
  @IsBoolean()
  hasDisability: boolean;

  @Column({ nullable: true })
  disabilityDetails?: string;

  @Column({ nullable: true })
  moreDetails?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  doesDateDivorced: boolean;

  @Column('enum', { enum: ShmiratNegia })
  @IsEnum(ShmiratNegia)
  doesShomerNegia: ShmiratNegia;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  shmiratNegiaDetails?: string;

  @Column({ nullable: true })
  @IsBoolean()
  doesSmoke?: boolean;

  @Column('boolean')
  @IsBoolean()
  doesWantAdvertisement: boolean;

  @Column('enum', { enum: ClientStatuses, default: ClientStatuses.Available })
  @IsEnum(ClientStatuses)
  status: ClientStatuses;

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

  @ManyToMany(() => Ethnicity)
  @JoinTable({
    name: 'clients_ethnicities',
    joinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ethnicity_id',
      referencedColumnName: 'id',
    },
  })
  ethnicities: Ethnicity[];
}
