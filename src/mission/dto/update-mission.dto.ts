import { PartialType } from '@nestjs/swagger';
import { CreateUserMissionDto } from './create-user-mission.dto';

export class UpdateMissionDto extends PartialType(CreateUserMissionDto) {}
