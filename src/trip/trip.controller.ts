import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripService.createNewTrip(createTripDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateTrip(@Body() updateTripDto: UpdateTripDto) {
    return this.tripService.updateTrip(updateTripDto);
  }
}
