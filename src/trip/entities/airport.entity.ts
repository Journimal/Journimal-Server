import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  airport_name: string;

  @Column('varchar')
  country: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  code: string;
}
