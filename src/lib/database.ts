import { DataSource } from 'typeorm';
import { typeormConfig } from './typeorm-config';

export const AppDataSource = new DataSource(typeormConfig);

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
