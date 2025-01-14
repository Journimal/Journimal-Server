import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  user_id: string;

  @Column('varchar', { nullable: false })
  user_pw: string;

  @Column('varchar', { length: 50 })
  user_name: string;

  @Column({ default: 0 })
  trip_count: number;

  @Column({ default: 0 })
  completed_mission: number;
}
