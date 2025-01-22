import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { UpdateTripDto } from './dto/update-trip.dto';
import { AnimalEntity } from './entities/animal.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,

    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async createNewTrip(createTripDto: CreateTripDto) {
    const existingTrip = await this.tripRepository.findOne({
      where: { id: createTripDto.id },
    });

    if (existingTrip) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Trip with this ID already exists.',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newTrip = this.tripRepository.create(createTripDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Trip created successfully',
      data: await this.tripRepository.save(newTrip),
    };
  }

  async updateTrip(updateTripDto: UpdateTripDto) {
    const { id, animal_image, complete_mission } = updateTripDto;
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['animal_image', 'final_animal'],
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    if (complete_mission !== undefined)
      trip.complete_mission = trip.complete_mission + 1;

    // find the animal from AnimalEntity
    if (animal_image) {
      const animal = await this.animalRepository.findOne({
        where: { id: animal_image },
      });

      if (!animal) {
        throw new NotFoundException('Animal not found');
      }

      trip.animal_image = animal;
      trip.final_animal = animal;
    }

    await this.tripRepository.save(trip);
    return {
      departure: trip.departure,
      arrival: trip.arrival,
      start_date: trip.start_date,
      end_date: trip.end_date,
      complete_mission: trip.complete_mission,
      animal_image: trip.animal_image?.image || null,
      final_animal: trip.final_animal.name || null,
    };
  }
}
