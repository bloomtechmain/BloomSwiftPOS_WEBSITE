const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.createRegistration = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password
  } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields (Full Name, Username, Email, Password) are required',
    });
  }

  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (
        full_name,
        username,
        email,
        password_hash
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, username, email, created_at
    `;

    const values = [
      fullName,
      username,
      email,
      passwordHash
    ];

    const result = await db.query(insertQuery, values);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('Error creating user registration', err);

    if (err.code === '23505') {
      if (err.constraint.includes('username')) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }
      if (err.constraint.includes('email')) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create registration',
      error: err.message
    });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const totalResult = await db.query(
      'SELECT COUNT(*) AS count FROM users'
    );

    const totalUsers = parseInt(totalResult.rows[0].count, 10);

    const lastDayResult = await db.query(
      "SELECT COUNT(*) AS count FROM users WHERE created_at >= NOW() - INTERVAL '1 day'"
    );

    const newUsersLast24Hours = parseInt(lastDayResult.rows[0].count, 10);

    const latestResult = await db.query(
      'SELECT id, full_name AS "fullName", email, created_at FROM users ORDER BY created_at DESC LIMIT 1'
    );

    const latestUser = latestResult.rowCount > 0 ? latestResult.rows[0] : null;

    let posRequestsCount = 0;
    try {
      const posResult = await db.query('SELECT COUNT(*) AS count FROM services_requests');
      posRequestsCount = parseInt(posResult.rows[0].count, 10);
    } catch (err) {
      if (err.code !== '42P01') console.error('Error fetching pos stats', err);
    }

    let ticketRequestsCount = 0;
    try {
      const ticketResult = await db.query('SELECT COUNT(*) AS count FROM tickets');
      ticketRequestsCount = parseInt(ticketResult.rows[0].count, 10);
    } catch (err) {
      if (err.code !== '42P01') console.error('Error fetching ticket stats', err);
    }

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        newUsersLast24Hours,
        latestUser,
        posRequestsCount,
        ticketRequestsCount
      }
    });
  } catch (err) {
    if (err.code === '42P01') {
      return res.status(200).json({
        success: true,
        data: {
          totalUsers: 0,
          newUsersLast24Hours: 0,
          latestUser: null,
          posRequestsCount: 0,
          ticketRequestsCount: 0
        }
      });
    }

    console.error('Error fetching user stats', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user stats',
      error: err.message
    });
  }
};

const ensureServiceRequestsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS services_requests (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        company_name VARCHAR(150),
        servicetype VARCHAR(100) NOT NULL,
        contactnumber VARCHAR(20) NOT NULL,
        additional_information TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const addColumnIfNotExists = async (colName, colDef) => {
      try {
        const check = await db.query(
          "SELECT column_name FROM information_schema.columns WHERE table_name='services_requests' AND column_name=$1",
          [colName]
        );
        if (check.rows.length === 0) {
          await db.query(`ALTER TABLE services_requests ADD COLUMN ${colDef}`);
          console.log(`Added column ${colName}`);
        }
      } catch (err) {
        console.error(`Error adding column ${colName}:`, err.message);
        throw err;
      }
    };

    // Ensure all required columns exist
    await addColumnIfNotExists('username', 'username VARCHAR(100)');
    await addColumnIfNotExists('company_name', 'company_name VARCHAR(150)');
    await addColumnIfNotExists('servicetype', 'servicetype VARCHAR(100)');
    await addColumnIfNotExists('contactnumber', 'contactnumber VARCHAR(20)');
    await addColumnIfNotExists('additional_information', 'additional_information TEXT');
    await addColumnIfNotExists('created_at', 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    await addColumnIfNotExists('user_id', 'user_id VARCHAR(50)');
    await addColumnIfNotExists('email', 'email VARCHAR(150)');
    await addColumnIfNotExists('status', "status VARCHAR(50) DEFAULT 'Pending'");

  } catch (err) {
    console.error('Error ensuring table exists:', err.message);
    throw err;
  }
};

exports.getProjectRequests = async (req, res) => {
  try {
    // Ensure table and columns exist before querying
    await ensureServiceRequestsTable();

    let userRows = [];
    let serviceRows = [];

    // Safely fetch recent users (onboarding requests)
    try {
      const userResult = await db.query(
        'SELECT id, full_name AS "fullName", email, created_at FROM users ORDER BY created_at DESC LIMIT 50'
      );
      userRows = userResult.rows;
    } catch (err) {
      if (err.code !== '42P01') {
        console.error('Error fetching users for project requests', err);
      }
    }

    // Fetch POS service requests
    try {
      const serviceResult = await db.query(
        `SELECT
             sr.id,
             sr.username,
             sr.company_name,
             sr.servicetype,
             sr.contactnumber,
             sr.additional_information,
             sr.created_at,
             sr.status,
             COALESCE(sr.email, u.email) as email
           FROM services_requests sr
           LEFT JOIN users u ON sr.username = u.username
           ORDER BY sr.created_at DESC
           LIMIT 200`
      );
      serviceRows = serviceResult.rows;
    } catch (err) {
      console.error('Error fetching services_requests for project requests', err);
      // Don't fail completely if only service requests fail, just return empty for that part
      serviceRows = [];
    }

    const serviceRequests = serviceRows.map((row) => ({
      id: row.id,
      type: 'service',
      clientName: row.company_name || row.username,
      projectType: row.servicetype,
      contactnumber: row.contactnumber,
      additionalInformation: row.additional_information,
      username: row.username,
      email: row.email,
      status: row.status || 'Pending',
      created_at: row.created_at
    }));

    const requests = serviceRequests;

    return res.status(200).json({
      success: true,
      data: requests
    });
  } catch (err) {
    if (err.code === '42P01') {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    console.error('Error fetching project requests', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch project requests',
      error: err.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, full_name, username, email, created_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, email } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET full_name = $1, username = $2, email = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, full_name, username, email',
      [full_name, username, email, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0], message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: 'Failed to update user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Failed to delete user', error: err.message });
  }
};
