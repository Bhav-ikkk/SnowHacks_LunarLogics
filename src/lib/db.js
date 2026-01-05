/**
 * PostgreSQL Database Connection using pg-promise
 * Singleton pattern to prevent duplicate connections
 */
import pgPromise from 'pg-promise';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../.env') });

// Singleton: Initialize pg-promise only once
const initOptions = {
  query(e) {
    if (process.env.NODE_ENV === 'development') {
      //console.log('📜 Executing:', e.query);
    }
  },
  error(err, e) {
    console.error('❌ Error:', err.message);
    if (e.query) console.error('QUERY:', e.query);
  }
};

// Create a singleton instance
let pgp;
let db;

if (!global.pgpInstance) {
  pgp = pgPromise(initOptions);
  global.pgpInstance = pgp;
  
  // Connection config - Neon requires SSL
  const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000
  };
  
  // Only add SSL config for production/Neon (when DATABASE_URL contains 'neon')
  if (process.env.DATABASE_URL?.includes('neon')) {
    connectionConfig.ssl = { rejectUnauthorized: false };
  }
  
  db = pgp(connectionConfig);
  
  global.dbInstance = db;
  
  // Test connection only once
  db.connect()
    .then(obj => {
      console.log('✅ Connected to PostgreSQL');
      obj.done();
    })
    .catch(err => {
      console.error('❌ Connection failed:', err.message);
    });
} else {
  pgp = global.pgpInstance;
  db = global.dbInstance;
}

// Query helper
export async function query(sql, params = []) {
  const result = await db.any(sql, params);
  return result;
}

// Transaction helper
export async function transaction(callback) {
  return db.tx(callback);
}

export default db;
