
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../.env') });

const migrations = [
  {
    name: 'Create users table',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `
  }
];

async function runMigrations() {
  console.log('🚀 Starting database migration...\n');
  console.log('📝 DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');
  console.log('📝 Connection check...\n');

  try {
    for (const migration of migrations) {
      console.log(`▶️  Running: ${migration.name}`);
      await db.none(migration.sql);
      console.log(`✅ Completed: ${migration.name}\n`);
    }

    console.log('🎉 All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigrations();
