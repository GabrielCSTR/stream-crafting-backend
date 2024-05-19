import { IsEmail, IsString } from 'class-validator';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id?: string;

  @IsString()
  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column()
  password: string;

  @IsString()
  @Column()
  type: string;

  @IsString()
  @Column()
  steamID64: string;

  @IsString()
  @Column()
  twitch_channel: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @BeforeInsert()
  setDefaultValue?(): void {
    const newDate = new Date();
    this.created_at = newDate;
    this.updated_at = newDate;
  }

  @BeforeUpdate()
  updateDefaultValues?(): void {
    this.updated_at = new Date();
  }
}
