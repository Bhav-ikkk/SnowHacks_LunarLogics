import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Test database connection
    const result = await db.one('SELECT NOW() as time');
    
    return res.status(200).json({ 
      success: true,
      message: 'Database connected successfully!',
      serverTime: result.time
    });
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
