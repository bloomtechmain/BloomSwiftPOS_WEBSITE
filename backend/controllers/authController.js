const db = require('../config/db');
const bcrypt = require('bcrypt');
const { authLogger } = require('../middleware/logger');

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  const origin = req.headers.origin || req.headers.referer || 'unknown';

  // Log the login attempt
  authLogger.loginAttempt(email || 'no-email', origin);

  // Validate input
  if (!email || !password) {
    authLogger.loginFailed(email || 'no-email', 'Missing email or password');
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
      errorCode: 'MISSING_CREDENTIALS'
    });
  }

  // Check for admin credentials
  if (email === 'admin@gmail.com' && password === 'admin@12345') {
    authLogger.loginSuccess(email, 'admin');
    return res.status(200).json({
      success: true,
      user: {
        id: 'admin',
        fullName: 'Administrator',
        username: 'admin',
        email: 'admin@gmail.com',
        role: 'admin'
      },
      message: 'Admin login successful'
    });
  }

  try {
    const query = `
      SELECT
        id,
        full_name AS "fullName",
        username,
        email,
        password_hash
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    authLogger.loginAttempt(email, `Querying database for user`);
    const result = await db.query(query, [email]);

    if (result.rowCount === 0) {
      authLogger.loginFailed(email, 'Email not found in database');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    const user = result.rows[0];
    authLogger.loginAttempt(email, `User found, verifying password`);

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      authLogger.loginFailed(email, 'Password mismatch');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    const { password_hash, ...safeUser } = user;
    authLogger.loginSuccess(email, safeUser.role || 'user');

    return res.status(200).json({
      success: true,
      user: safeUser,
      message: 'Login successful'
    });
  } catch (err) {
    authLogger.databaseError('login', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to log in due to server error',
      errorCode: 'SERVER_ERROR',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

