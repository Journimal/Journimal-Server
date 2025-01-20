import { MissionEntity } from '../mission/entities/mission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class MissionSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MissionEntity);
    await repository.insert([
      {
        mission_name: 'VU Mission 1',
        level: 1,
        thumbnail: 'https://via.placeholder.com/150',
        image: 'https://via.placeholder.com/300',
        description: 'VU Mission 1 Description',
      },
      {
        mission_name: 'VU Mission 2',
        level: 1,
        thumbnail: 'https://via.placeholder.com/150',
        image: 'https://via.placeholder.com/300',
        description: 'VU Mission 2 Description',
      },
    ]);
  }
}
