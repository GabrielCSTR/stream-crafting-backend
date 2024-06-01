import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('players')
export class PlayerEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id?: ObjectId;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  last_name?: string;

  @IsString()
  @Column()
  nick: string;

  @IsString()
  @Column()
  country: string;

  @IsString()
  @Column()
  team?: ObjectId | string;

  @IsOptional()
  @Column()
  avatar?: string;
}
