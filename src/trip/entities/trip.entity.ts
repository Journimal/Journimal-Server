import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AnimalEntity } from './animal.entity';

@Entity()
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  departure: string;

  @Column('varchar')
  arrival: string;

  @Column('datetime')
  start_date: Date;

  @Column('datetime')
  end_date: Date;

  @Column({ type: 'int', default: 0 })
  complete_mission: number;

  @ManyToOne(() => AnimalEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'animal_image_id' })
  animal_image: AnimalEntity;

  @ManyToOne(() => AnimalEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'final_animal_id' })
  final_animal: AnimalEntity;
}
