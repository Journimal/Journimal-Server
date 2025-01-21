import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTripDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsInt()
  @IsOptional()
  readonly complete_mission?: number;

  // @IsNumber()
  @IsInt()
  @IsOptional()
  readonly animal_image?: number;
}
