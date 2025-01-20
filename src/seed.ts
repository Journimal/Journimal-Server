import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from './data-source';
import MissionSeeder from './seeds/missions.seeds';

export async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected and initialized.');

    await runSeeders(AppDataSource, {
      seeds: [MissionSeeder],
    });
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error running seeder:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedDatabase();
