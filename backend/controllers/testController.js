const db = require('../config/db');

exports.getTest = async (req, res) => {
  try {
    // This is a simple query to verify database connection
    const result = await db.query('SELECT NOW()');
    res.status(200).json({
      status: 'success',
      message: 'Backend is running and Database connection successful',
      timestamp: result.rows[0].now
    });
  } catch (err) {
    console.error(err);
    // If DB fails, we still want to show the server is running, but DB is down
    res.status(500).json({
      status: 'error',
      message: 'Backend is running but Database connection failed',
      error: err.message
    });
  }
};
