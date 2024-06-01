import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('teams')
@Unique(['name'])
export class TeamEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id?: ObjectId;

  @IsString()
  @Column({ unique: true })
  name: string;

  @IsString()
  @Column()
  tag: string;

  @IsString()
  @Column()
  country: string;

  @IsOptional()
  @Column()
  logo?: string;
}
