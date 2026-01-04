var types = require('pg').types

// Parse DATE type as string (prevents date conversion issues)
types.setTypeParser(1082, val => val)

const pgp = require('pg-promise')

// Initialize pg-promise with options
const initOptions = {
  noWarnings: true
}

// Database connection configuration
const cn = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  max: parseInt(process.env.DB_POOLSIZE || '10')
}

// Create database instance
const db = pgp(initOptions)(cn)

/**
 * Execute a query and return all rows
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export const query = async (text, params) => {
  try {
    const result = await db.any(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

/**
 * Execute a query and return a single row
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Object|null>} Single row or null
 */
export const queryOne = async (text, params) => {
  try {
    const result = await db.oneOrNone(text, params)
    return result
  } catch (error) {
    console.error('Database queryOne error:', error)
    throw error
  }
}

/**
 * Execute a query that returns no data (INSERT, UPDATE, DELETE)
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<null>}
 */
export const queryNone = async (text, params) => {
  try {
    await db.none(text, params)
    return null
  } catch (error) {
    console.error('Database queryNone error:', error)
    throw error
  }
}

/**
 * Execute multiple queries in a transaction
 * @param {Function} callback - Transaction callback function
 * @returns {Promise<any>} Transaction result
 */
export const transaction = async callback => {
  try {
    return await db.tx(callback)
  } catch (error) {
    console.error('Transaction error:', error)
    throw error
  }
}

export default db
