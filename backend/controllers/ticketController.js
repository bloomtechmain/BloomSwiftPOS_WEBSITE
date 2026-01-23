const db = require('../config/db');
const nodemailer = require('nodemailer');

exports.createTicket = async (req, res) => {
    const { name, project_name, message, user_id, email } = req.body;

    if (!name || !project_name || !message || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name, Project Name, Email, and Message are required'
        });
    }

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(50),
                name VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                project_name VARCHAR(150) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const insertQuery = `
            INSERT INTO tickets (user_id, name, email, project_name, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [user_id || null, name, email, project_name, message];
        const result = await db.query(insertQuery, values);

        // Send email notification to admin
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
                to: 'info@bloomtech.lk', // Admin email as per other controllers
                subject: 'New Support Ticket Submitted',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #002044;">New Support Ticket</h2>
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Project Name:</strong> ${project_name}</p>
                            <p><strong>Message:</strong></p>
                            <p style="background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">${message}</p>
                            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <p style="margin-top: 20px;">
                            <a href="http://localhost:5173/admin/tickets" style="background-color: #0055D4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
                        </p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        } catch (emailErr) {
            console.error('Error sending email notification:', emailErr);
            // Continue execution, don't fail the request just because email failed
        }

        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'Ticket submitted successfully'
        });

    } catch (err) {
        console.error('Error creating ticket:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create ticket',
            error: err.message
        });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        // Ensure table exists (just in case)
        await db.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(50),
                name VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                project_name VARCHAR(150) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const result = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching tickets:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tickets'
        });
    }
};

exports.getUserTickets = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    try {
        // Ensure table exists
        await db.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(50),
                name VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                project_name VARCHAR(150) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const result = await db.query('SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching user tickets:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tickets'
        });
    }
};

exports.markAsReplied = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "UPDATE tickets SET status = 'Replied' WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Ticket marked as replied'
        });
    } catch (err) {
        console.error('Error updating ticket status:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update ticket status'
        });
    }
};

exports.getPendingCount = async (req, res) => {
    try {
        const result = await db.query("SELECT COUNT(*) FROM tickets WHERE status = 'Pending'");
        res.status(200).json({
            success: true,
            count: parseInt(result.rows[0].count, 10)
        });
    } catch (err) {
        console.error('Error fetching pending ticket count:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch count'
        });
    }
};
