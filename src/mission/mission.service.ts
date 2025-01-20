import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionEntity } from './entities/mission.entity';
import { UserMissionEntity } from './entities/user-missions.entity';
import { CreateUserMissionDto } from './dto/create-user-mission.dto';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(MissionEntity)
    private missionRepository: Repository<MissionEntity>,

    @InjectRepository(UserMissionEntity)
    private userMissionRepository: Repository<UserMissionEntity>,
  ) {}

  // create mission
  async chooseMission(
    user_nid: number,
    createUserMissions: CreateUserMissionDto[],
  ): Promise<any> {
    console.log(createUserMissions);

    const results = [];
    for (const missionDto of createUserMissions) {
      // id를 찾아서 mission_id 변수에 저장함
      const { id: mission_id } = missionDto;
      // 1. check if mission exists
      const mission = await this.missionRepository.findOne({
        where: { id: mission_id },
      });

      if (!mission) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Mission with ID  ${mission_id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // 2. check if user already has the mission logic
      const existingUserMission = await this.userMissionRepository.findOne({
        where: { user_id: user_nid, mission_id: mission_id },
      });
      if (existingUserMission) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `Mission with ID ${mission_id} already assigned to user`,
          },
          HttpStatus.CONFLICT,
        );
      }

      // create new user mission
      const userMission = this.userMissionRepository.create({
        user_id: user_nid,
        mission_id: mission_id,
      });

      const savedUserMission =
        await this.userMissionRepository.save(userMission);
      results.push(savedUserMission);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'UserMission created successfully',
      data: results,
    };
  }

  // get current mission
  // async getCurrentMission(@User('id') id: number): Promise<MissionResponse> {}
}
