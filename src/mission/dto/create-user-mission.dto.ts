import { IsNotEmpty, IsNumber } from 'class-validator';
// import { MissionLevel } from '../entities/mission.entity';

export class CreateUserMissionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
