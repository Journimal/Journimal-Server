import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserMissionEntity } from '../entities/user-missions.entity';

export enum MissionLevel {
  VU = 1,
  EN = 2,
  CE = 3,
}

@Entity()
export class MissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  mission_name: string;

  @Column({
    type: 'enum',
    enum: MissionLevel,
    default: MissionLevel.VU,
  })
  level: MissionLevel;

  @Column('varchar', { length: 255 })
  thumbnail: string;

  @Column('varchar', { length: 255 })
  image: string;

  @Column('varchar', { length: 500 })
  description: string;

  @OneToMany(() => UserMissionEntity, (userMission) => userMission.mission)
  userMissions: UserMissionEntity[];
}
