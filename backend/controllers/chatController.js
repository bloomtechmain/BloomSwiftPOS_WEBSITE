const db = require('../config/db');

// Ensure required columns exist
const ensureColumns = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100),
                message TEXT,
                time TIME,
                date DATE,
                sender_role VARCHAR(20),
                conversation_id VARCHAR(100),
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const addColumn = async (colName, colDef) => {
            try {
                const check = await db.query(
                    "SELECT column_name FROM information_schema.columns WHERE table_name='messages' AND column_name=$1",
                    [colName]
                );
                if (check.rows.length === 0) {
                    await db.query(`ALTER TABLE messages ADD COLUMN ${colDef}`);
                    console.log(`Added column ${colName} to messages`);
                }
            } catch (err) {
                console.error(`Error adding column ${colName}:`, err.message);
            }
        };

        await addColumn('is_read', 'is_read BOOLEAN DEFAULT FALSE');
        await addColumn('created_at', 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        await addColumn('conversation_id', 'conversation_id VARCHAR(100)');
        await addColumn('sender_role', 'sender_role VARCHAR(20)');
    } catch (err) {
        console.error('Error ensuring messages table schema:', err);
    }
};

exports.sendMessage = async (req, res) => {
    const { username, message, sender_role, conversation_id } = req.body;

    if (!username || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        await ensureColumns();

        const currentDate = new Date();
        const time = currentDate.toLocaleTimeString('en-GB', { hour12: false });
        const date = currentDate.toISOString().split('T')[0];
        const role = sender_role || 'user';
        // If admin sends, it's considered read by admin (but unread by user). 
        // If user sends, it's unread by admin.
        // But 'is_read' usually means "read by the recipient".
        // So default FALSE is correct for both.

        const query = `
            INSERT INTO messages (username, message, time, date, sender_role, conversation_id, is_read, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING *
        `;
        const values = [username, message, time, date, role, conversation_id || username, false];
        const result = await db.query(query, values);
        return res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ success: false, message: 'Failed to send message', error: err.message });
    }
};

exports.getConversations = async (req, res) => {
    try {
        await ensureColumns();

        // Get conversations sorted by latest message, with unread count
        const query = `
            SELECT 
                m.conversation_id as username,
                MAX(m.created_at) as last_message_time,
                COUNT(CASE WHEN m.is_read = FALSE AND m.sender_role = 'user' THEN 1 END) as unread_count,
                (SELECT message FROM messages m2 WHERE m2.conversation_id = m.conversation_id ORDER BY m2.created_at DESC LIMIT 1) as last_message
            FROM messages m
            WHERE m.conversation_id IS NOT NULL
            GROUP BY m.conversation_id
            ORDER BY last_message_time DESC
        `;
        const result = await db.query(query);
        return res.status(200).json({ success: true, data: result.rows });

    } catch (err) {
        console.error('Error fetching conversations:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch conversations', error: err.message });
    }
};

exports.getHistory = async (req, res) => {
    const { username } = req.params;
    try {
        await ensureColumns();

        const query = `
            SELECT * FROM messages
            WHERE conversation_id = $1
            ORDER BY created_at ASC
        `;
        const result = await db.query(query, [username]);
        return res.status(200).json({ success: true, data: result.rows });

    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch history', error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    const { conversation_id } = req.params;
    const { reader_role } = req.body; // 'admin' or 'user'

    if (!conversation_id || !reader_role) {
        return res.status(400).json({ success: false, message: 'Missing conversation_id or reader_role' });
    }

    try {
        await ensureColumns();

        // If reader is admin, mark messages from user as read
        // If reader is user, mark messages from admin as read
        const senderToMark = reader_role === 'admin' ? 'user' : 'admin';

        const query = `
            UPDATE messages
            SET is_read = TRUE
            WHERE conversation_id = $1 AND sender_role = $2 AND is_read = FALSE
        `;
        await db.query(query, [conversation_id, senderToMark]);

        res.status(200).json({ success: true, message: 'Messages marked as read' });
    } catch (err) {
        console.error('Error marking messages as read:', err);
        res.status(500).json({ success: false, message: 'Failed to mark messages as read' });
    }
};

exports.getUnreadCount = async (req, res) => {
    const { role, username } = req.query; // role: 'admin' or 'user'

    try {
        await ensureColumns();

        let query;
        let values;

        if (role === 'admin') {
            // Count all unread messages from users
            query = `SELECT COUNT(*) as count FROM messages WHERE sender_role = 'user' AND is_read = FALSE`;
            values = [];
        } else if (role === 'user' && username) {
            // Count unread messages from admin for this specific user
            query = `SELECT COUNT(*) as count FROM messages WHERE conversation_id = $1 AND sender_role = 'admin' AND is_read = FALSE`;
            values = [username];
        } else {
            return res.status(400).json({ success: false, message: 'Invalid parameters' });
        }

        const result = await db.query(query, values);
        res.status(200).json({ success: true, count: parseInt(result.rows[0].count) });

    } catch (err) {
        console.error('Error fetching unread count:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch unread count' });
    }
};
