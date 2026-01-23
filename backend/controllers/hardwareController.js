const db = require('../config/db');

const ensureHardwareTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS hardware (
      id SERIAL PRIMARY KEY,
      hardware_name VARCHAR(255) NOT NULL,
      brand VARCHAR(255),
      category VARCHAR(255),
      price NUMERIC(10,2),
      specs TEXT,
      additional_notes TEXT,
      image BYTEA,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add category column if it doesn't exist (migration for existing table)
  try {
    await db.query(`ALTER TABLE hardware ADD COLUMN IF NOT EXISTS category VARCHAR(255)`);
  } catch (err) {
    console.log('Column category might already exist or error adding it:', err.message);
  }
};

exports.getHardware = async (req, res) => {
  try {
    await ensureHardwareTable();

    const result = await db.query(
      `SELECT
         id,
         hardware_name,
         brand,
         category,
         price,
         specs,
         additional_notes,
         image,
         created_at
       FROM hardware
       ORDER BY created_at DESC`
    );

    const rows = result.rows.map((row) => {
      let imageDataUrl = null;
      if (row.image) {
        try {
          const base64 = row.image.toString('base64');
          imageDataUrl = `data:image/*;base64,${base64}`;
        } catch {
          imageDataUrl = null;
        }
      }

      return {
        id: row.id,
        hardware_name: row.hardware_name,
        brand: row.brand,
        category: row.category,
        price: row.price,
        specs: row.specs,
        additional_notes: row.additional_notes,
        created_at: row.created_at,
        image: imageDataUrl
      };
    });

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching hardware list', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hardware list',
      error: err.message
    });
  }
};

exports.createHardware = async (req, res) => {
  const {
    hardware_name,
    brand,
    category,
    price,
    specs,
    additional_notes,
    image
  } = req.body;

  if (!hardware_name) {
    return res.status(400).json({
      success: false,
      message: 'hardware_name is required'
    });
  }

  try {
    await ensureHardwareTable();

    let imageBuffer = null;

    if (image) {
      try {
        let base64Data = image;
        if (typeof image === 'string' && image.includes(',')) {
          const parts = image.split(',');
          base64Data = parts[1] || parts[0];
        }
        imageBuffer = Buffer.from(base64Data, 'base64');
      } catch (err) {
        console.error('Failed to parse image data, storing null', err);
        imageBuffer = null;
      }
    }

    const insertQuery = `
      INSERT INTO hardware (
        hardware_name,
        brand,
        category,
        price,
        specs,
        additional_notes,
        image
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        hardware_name,
        brand,
        category,
        price,
        specs,
        additional_notes,
        created_at
    `;

    const values = [
      hardware_name,
      brand || null,
      category || null,
      price !== undefined && price !== null && price !== '' ? Number(price) : null,
      specs || null,
      additional_notes || null,
      imageBuffer
    ];

    const result = await db.query(insertQuery, values);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Hardware created successfully'
    });
  } catch (err) {
    console.error('Error creating hardware', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to create hardware',
      error: err.message
    });
  }
};
