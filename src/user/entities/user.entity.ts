import { UserMissionEntity } from '../../mission/entities/user-missions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
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

  @OneToMany(() => UserMissionEntity, (userMission) => userMission.user)
  userMissions: UserMissionEntity[];
}
