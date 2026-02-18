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
      images JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add category column if it doesn't exist (migration for existing table)
  try {
    await db.query(`ALTER TABLE hardware ADD COLUMN IF NOT EXISTS category VARCHAR(255)`);
  } catch (err) {
    console.log('Column category might already exist or error adding it:', err.message);
  }

  // Add images column for multiple images support
  try {
    await db.query(`ALTER TABLE hardware ADD COLUMN IF NOT EXISTS images JSONB`);
  } catch (err) {
    console.log('Column images might already exist or error adding it:', err.message);
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
         images,
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

      // Handle multiple images stored in JSONB
      let imagesArray = [];
      if (row.images && Array.isArray(row.images)) {
        imagesArray = row.images;
      } else if (imageDataUrl) {
        // Backwards compatibility: if old single image exists, include it
        imagesArray = [imageDataUrl];
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
        image: imageDataUrl,
        images: imagesArray
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
    image,
    images
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

    // Handle multiple images
    let imagesArray = null;
    if (images && Array.isArray(images) && images.length > 0) {
      imagesArray = images;
    }

    const insertQuery = `
      INSERT INTO hardware (
        hardware_name,
        brand,
        category,
        price,
        specs,
        additional_notes,
        image,
        images
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
      imageBuffer,
      imagesArray ? JSON.stringify(imagesArray) : null
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

exports.updateHardware = async (req, res) => {
  const { id } = req.params;
  const {
    hardware_name,
    brand,
    category,
    price,
    specs,
    additional_notes,
    image,
    images
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

    // Handle multiple images update
    let imagesJson = null;
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > 0) {
        imagesJson = JSON.stringify(images);
      } else if (images === null || (Array.isArray(images) && images.length === 0)) {
        imagesJson = null;
      }
    }

    const updateQuery = `
      UPDATE hardware
      SET
        hardware_name = $1,
        brand = $2,
        category = $3,
        price = $4,
        specs = $5,
        additional_notes = $6,
        image = COALESCE($7, image),
        images = COALESCE($8, images)
      WHERE id = $9
      RETURNING *;
    `;

    const values = [
      hardware_name,
      brand || null,
      category || null,
      price !== undefined && price !== null && price !== '' ? Number(price) : null,
      specs || null,
      additional_notes || null,
      imageBuffer,
      imagesJson,
      id
    ];

    const result = await db.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hardware not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Hardware updated successfully'
    });
  } catch (err) {
    console.error('Error updating hardware', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update hardware',
      error: err.message
    });
  }
};

exports.deleteHardware = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureHardwareTable();

    const deleteQuery = 'DELETE FROM hardware WHERE id = $1 RETURNING id';
    const result = await db.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hardware not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Hardware deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting hardware', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete hardware',
      error: err.message
    });
  }
};

