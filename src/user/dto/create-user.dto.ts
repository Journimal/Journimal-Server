import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

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
}
