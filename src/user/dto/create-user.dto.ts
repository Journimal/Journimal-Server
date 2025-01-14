import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly user_pw: string;

  @IsString()
  readonly user_name: string;

  @IsInt()
  readonly trip_count: number;

  @IsInt()
  readonly completed_mission: number;

  @IsInt()
  readonly en_animal_id: number;

  @IsInt()
  readonly vu_animal_id: number;

  @IsInt()
  readonly ce_animal_id: number;
}
