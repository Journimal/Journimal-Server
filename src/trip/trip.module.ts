import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './entities/airport.entity';
import { TripEntity } from './entities/trip.entity';
import { AnimalEntity } from './entities/animal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AirportEntity, TripEntity, AnimalEntity]),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
