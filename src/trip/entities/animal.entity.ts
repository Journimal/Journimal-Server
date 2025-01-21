import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MissionLevel } from '../../mission/entities/mission.entity';

@Entity()
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  image: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  level: MissionLevel;

  @Column({ default: false })
  is_get_user: boolean;
}
