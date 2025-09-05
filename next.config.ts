import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore problematic TypeORM modules that aren't needed for PostgreSQL
    config.externals = config.externals || [];
    
    if (isServer) {
      config.externals.push({
        'react-native-sqlite-storage': 'commonjs react-native-sqlite-storage',
        '@sap/hana-client/extension/Stream': 'commonjs @sap/hana-client/extension/Stream',
        'mysql': 'commonjs mysql',
        'mysql2': 'commonjs mysql2',
        'sqlite3': 'commonjs sqlite3',
        'better-sqlite3': 'commonjs better-sqlite3',
        'oracledb': 'commonjs oracledb',
        'mssql': 'commonjs mssql',
        'mongodb': 'commonjs mongodb',
        'redis': 'commonjs redis',
        'ioredis': 'commonjs ioredis',
      });
    }

    // Add fallbacks for client-side builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-native-sqlite-storage': false,
      '@sap/hana-client/extension/Stream': false,
      'mysql': false,
      'mysql2': false,
      'sqlite3': false,
      'better-sqlite3': false,
      'oracledb': false,
      'mssql': false,
      'mongodb': false,
      'redis': false,
      'ioredis': false,
    };

    return config;
  },
};

export default nextConfig;
