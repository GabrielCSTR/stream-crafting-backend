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
  @Column({ default: null })
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column({ default: null })
  password: string;

  @IsString()
  @Column({ default: null })
  type: string;

  @IsString()
  @Column({ default: null })
  steamID64: string;

  @IsString()
  @Column({ default: null })
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
