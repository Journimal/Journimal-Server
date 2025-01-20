import { MissionService } from './mission.service';
import { User } from 'src/user/util/user.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserMissionDto } from './dto/create-user-mission.dto';

export class MissionResponse {
  id: number;
  mission_name: string;
  level: string;
  thumbnail: string;
  image: string;
  description: string;
}

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  // create mission
  @Post('choose')
  @UseGuards(JwtAuthGuard)
  async chooseMission(
    @User('id') user_nid: number,
    @Body('createUserMission') createUserMissions: CreateUserMissionDto[],
  ): Promise<any> {
    console.log(createUserMissions);
    return this.missionService.chooseMission(user_nid, createUserMissions);
  }

  // get current mission
  // @Get('current')
  // @UseGuards(JwtAuthGuard)
  // async getCurrentMission(@User('id') id: number): Promise<MissionResponse> {
  //   return this.missionService.getCurrentMission(id);
  // }
}
