const db = require('../config/db');
const nodemailer = require('nodemailer');

const ensureTableColumns = async () => {
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
        throw err; // Re-throw to be caught by main try-catch
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
    throw err; // Propagate error so request fails explicitly if schema is wrong
  }
};

exports.createServiceRequest = async (req, res) => {
  const {
    username,
    company_name,
    servicetype,
    contactnumber,
    additional_information,
    user_id,
    email
  } = req.body;

  if (!username || !servicetype || !contactnumber) {
    return res.status(400).json({
      success: false,
      message: 'username, servicetype and contactnumber are required'
    });
  }

  try {
    await ensureTableColumns();

    const insertQuery = `
      INSERT INTO services_requests (
        username,
        company_name,
        servicetype,
        contactnumber,
        additional_information,
        user_id,
        email,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending')
      RETURNING *
    `;

    const values = [
      username,
      company_name || null,
      servicetype,
      contactnumber,
      additional_information || null,
      user_id || null,
      email || null
    ];

    const result = await db.query(insertQuery, values);
    let emailStatus = 'sent';
    let emailErrorMsg = '';

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"BloomSwift POS System" <${process.env.SMTP_USER}>`,
        to: 'info@bloomtech.lk',
        subject: 'New pos request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #002044;">New POS Request Received</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Email:</strong> ${email || 'N/A'}</p>
              <p><strong>Company Name:</strong> ${company_name || 'N/A'}</p>
              <p><strong>Service Type:</strong> ${servicetype}</p>
              <p><strong>Contact Number:</strong> ${contactnumber}</p>
              <p><strong>Additional Information:</strong> ${additional_information || 'N/A'}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="margin-top: 20px;">
              <a href="http://localhost:5173/admin/project-requests" style="background-color: #0055D4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Notification email sent to tharushatheekshana60@gmail.com');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      emailStatus = 'failed';
      emailErrorMsg = emailError.message;
    }

    return res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Service request submitted successfully',
      emailStatus,
      emailError: emailErrorMsg
    });
  } catch (err) {
    console.error('Error creating service request', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to create service request',
      error: err.message
    });
  }
};

exports.getUserServiceRequests = async (req, res) => {
  const { userId } = req.params;
  try {
    await ensureTableColumns();
    const result = await db.query(
      'SELECT * FROM services_requests WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error fetching user requests:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch requests: ' + err.message, error: err.message });
  }
};

exports.markAsReplied = async (req, res) => {
  const { id } = req.params;
  try {
    await ensureTableColumns();
    const result = await db.query(
      "UPDATE services_requests SET status = 'Replied' WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error updating request status:', err);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

exports.getPendingCount = async (req, res) => {
  try {
    await ensureTableColumns();
    const result = await db.query(
      "SELECT COUNT(*) FROM services_requests WHERE status = 'Pending'"
    );
    res.status(200).json({ success: true, count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error('Error fetching pending request count:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch count' });
  }
};
