import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Team } from './entities/Team';
import { Participant } from './entities/Participant';

// Clean the DATABASE_URL to remove problematic parameters for TypeORM
function getCleanDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return 'postgresql://localhost:5432/ezhumi';
  
  // Remove channel_binding parameter which causes issues with TypeORM
  return url.replace(/[?&]channel_binding=[^&]*/g, '');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: getCleanDatabaseUrl(),
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
  synchronize: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Team, Participant],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
});

// Initialize the database connection
let isInitializing = false;
let initPromise: Promise<void> | null = null;

export const initializeDatabase = async () => {
  if (AppDataSource.isInitialized) {
    return;
  }

  if (isInitializing && initPromise) {
    return initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    try {
      await AppDataSource.initialize();
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
};

export const getDatabase = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return AppDataSource;
};
