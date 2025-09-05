import { DataSource } from 'typeorm';

// Create a basic connection without entities for initialization
const createConnection = () => {
  return new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false, // We'll handle this separately
    logging: process.env.NODE_ENV === 'development',
  });
};

let connection: DataSource | null = null;

export const getConnection = async () => {
  if (!connection) {
    connection = createConnection();
    if (!connection.isInitialized) {
      await connection.initialize();
    }
  }
  return connection;
};
