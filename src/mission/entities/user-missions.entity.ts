import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MissionEntity } from './mission.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class UserMissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  mission_id: number;

  @Column({ default: false })
  completed: boolean;

  // user and userMission relationship
  // UserMissionEntity 테이블의 user_id 컬럼이 UserEntity 테이블의 id 컬럼을 참조
  user: UserEntity;
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })

  // user and mission relationship
  // UserMissionEntity 테이블의 mission_id 컬럼이 MissionEntity 테이블의 id 컬럼을 참조
  @ManyToOne(() => MissionEntity, (mission) => mission.id)
  @JoinColumn({ name: 'mission_id' })
  mission: MissionEntity;
}
