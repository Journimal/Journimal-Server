import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionEntity } from './entities/mission.entity';
import { UserMissionEntity } from './entities/user-missions.entity';
import { CreateUserMissionDto } from './dto/create-user-mission.dto';
import { User } from 'src/user/util/user.decorator';

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
    createUserMissions: CreateUserMissionDto,
  ): Promise<any> {
    // id를 찾아서 mission_id 변수에 저장함
    const { id: mission_id } = createUserMissions;

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

    const savedUserMission = await this.userMissionRepository.save(userMission);

    return {
      status: HttpStatus.CREATED,
      message: 'UserMission created successfully',
      data: savedUserMission,
    };
  }

  // get current mission
  async getCurrentMission(@User('id') user_nid: number): Promise<any> {
    const currentMission = await this.userMissionRepository.find({
      where: { user_id: user_nid },
    });

    if (!currentMission) {
      throw new NotFoundException('Current mission not found for the user');
    }

    return {
      status: HttpStatus.OK,
      message: 'User currentMission found',
      data: currentMission,
    };
  }
}
