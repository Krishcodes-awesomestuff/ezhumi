import 'reflect-metadata';
import { config } from 'dotenv';
import { initializeDatabase } from './database';

// Load environment variables from .env.local
config({ path: '.env.local' });

export async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.log('⚠️  DATABASE_URL not found. Skipping database initialization.');
      console.log('💡 Set DATABASE_URL environment variable to initialize database during build.');
      return;
    }
    
    console.log('📡 DATABASE_URL found, attempting connection...');
    console.log('🔗 Database URL format:', process.env.DATABASE_URL.substring(0, 20) + '...');
    
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    console.log('💡 Make sure your DATABASE_URL is correct and the database is accessible.');
    console.log('💡 Skipping database initialization and continuing with build...');
    // Don't exit with error during build - just warn and continue
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initDatabase();
}
