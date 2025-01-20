import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from './entities/mission.entity';
import { UserMissionEntity } from './entities/user-missions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionEntity, UserMissionEntity])],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
