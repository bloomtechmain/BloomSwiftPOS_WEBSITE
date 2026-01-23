const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Check for admin credentials
  if (email === 'admin@gmail.com' && password === 'admin@12345') {
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

    const result = await db.query(query, [email]);

    if (result.rowCount === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const { password_hash, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      user: safeUser,
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Error during login', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to log in',
      error: err.message
    });
  }
};

