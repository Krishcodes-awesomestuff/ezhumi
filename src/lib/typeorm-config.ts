import { DataSourceOptions } from 'typeorm';
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

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  url: getCleanDatabaseUrl(),
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
  synchronize: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Team, Participant],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
  // Explicitly specify only PostgreSQL driver
  extra: {
    // Ensure we only use PostgreSQL-specific options
    ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false,
  },
};
