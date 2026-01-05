
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
    name: 'Add OAuth columns to users (if not exist)',
    sql: `
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='provider') THEN
          ALTER TABLE users ADD COLUMN provider VARCHAR(50);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='provider_id') THEN
          ALTER TABLE users ADD COLUMN provider_id VARCHAR(255);
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password' AND is_nullable='NO') THEN
          ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
        END IF;
      END $$;
      
      CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
    `
  },
  {
    name: 'Create users table (for new installations)',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        provider VARCHAR(50),
        provider_id VARCHAR(255),
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
