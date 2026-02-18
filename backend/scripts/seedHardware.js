
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Path to assets folder
const ASSETS_DIR = path.join(__dirname, '../../frontend/src/assets');

// Helper to fetch image as buffer (from URL)
const fetchImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error(`Error fetching image from ${url}:`, err.message);
    return null;
  }
};

// Helper to read local image
const getLocalImage = (filename) => {
  try {
    const filePath = path.join(ASSETS_DIR, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
    console.warn(`Local image not found: ${filename}`);
    return null;
  } catch (err) {
    console.error(`Error reading local image ${filename}:`, err.message);
    return null;
  }
};

const hardwareList = [
  // Monitors
  {
    category: 'Monitors',
    imageUrl: 'https://unsplash.com/photos/mHm1ASYNC0I/download',
    items: [
      { hardware_name: '16inch Monitor', price: 7000, brand: 'seoul tech tradings', specs: '16inch', localImage: '16inch Monitor.jpg' },
      { hardware_name: '19inch Monitor', price: 6700, brand: 'seoul tech tradings', specs: '19inch', localImage: '19inch Monitor.jpg' },
      { hardware_name: '22inch Monitor', price: 8850, brand: 'seoul tech tradings', specs: '22inch', localImage: '22inch Monitor.jpg' },
      { hardware_name: '24inch Monitor', price: 10500, brand: 'seoul tech tradings', specs: '24inch', localImage: '24inch Monitor.jpg' }
    ]
  },
  // Computers
  {
    category: 'Computers',
    imageUrl: 'https://unsplash.com/photos/2rQoMZLVXHc/download',
    items: [
      { hardware_name: 'Hp i3 4th gen', price: null, brand: 'Hp', specs: 'i3 4th gen 8gb Ram 128ssd', localImage: 'Hp i3 4th gen.jpg' },
      { hardware_name: 'Hp i5 4th gen', price: null, brand: 'Hp', specs: 'i5 4th gen 16gb Ram 128ssd', localImage: 'Hp i5 4th gen.jpg' },
      { hardware_name: 'Dell i3 4th gen', price: null, brand: 'Dell', specs: 'i3 4th gen 8gb Ram 128ssd', localImage: 'Dell i3 4th gen.jpg' },
      { hardware_name: 'Dell i5 4th gen', price: null, brand: 'Dell', specs: 'i5 4th gen 16gb Ram 128ssd', localImage: 'Dell i3 4th gen.jpg' }, // Reuse i3 image
      { hardware_name: 'Lenovo i3 4th gen', price: null, brand: 'Lenovo', specs: 'i3 4th gen 8gb Ram 128ssd', localImage: 'Lenovo i5 4th gen.jpg' }, // Reuse i5 image
      { hardware_name: 'Lenovo i5 4th gen', price: null, brand: 'Lenovo', specs: 'i5 4th gen 16gb Ram 128ssd', localImage: 'Lenovo i5 4th gen.jpg' }
    ]
  },
  {
    category: 'Computers',
    imageUrl: 'https://unsplash.com/photos/XWPoEJnLQAc/download', // Mac Mini style / Desk setup
    items: [
      { hardware_name: 'Mac Mini i3', price: null, brand: 'Apple', specs: 'i3 8gb of Ram 128ssd', localImage: 'Mac Mini i3.avif' },
      { hardware_name: 'Mac Mini i5', price: null, brand: 'Apple', specs: 'i5 16gb of Ram 128ssd', localImage: 'Mac Mini i5.avif' }
    ]
  },
  // Keyboard and mouse
  {
    category: 'Keyboard and mouse',
    imageUrl: 'https://unsplash.com/photos/szrJ3wjzOMg/download',
    items: [
      { hardware_name: 'Basic keyboard and mouse', price: 1850, brand: 'seoul tech tradings', specs: 'Basic keyboard and mouse' },
      { hardware_name: 'Good keyboard and mouse', price: 3000, brand: 'seoul tech tradings', specs: 'Good keyboard and mouse' },
      { hardware_name: 'Best keyboard and mouse', price: 8100, brand: 'seoul tech tradings', specs: 'Best keyboard and mouse' }
    ]
  },
  // Scanners
  {
    category: 'Scanners',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=600&auto=format&fit=crop',
    items: [
      { hardware_name: 'Gun style scanner with stand', price: null, brand: null, specs: 'Gun style scanner with stand', localImage: 'Gun style scanner with stand.jpg' },
      { hardware_name: 'Desktop wide angle scanner', price: null, brand: null, specs: 'Desktop wide angle scanner', localImage: 'Desktop wide angle scanner.jpg' }
    ]
  },
  // Cash Drawers
  {
    category: 'Cash Drawers',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&auto=format&fit=crop',
    items: [
      { hardware_name: 'Automatic Cash Drawer', price: 10500, brand: null, specs: 'Automatic', localImage: 'Automatic Cash Drawer.jpg' },
      { hardware_name: 'Manual Cash Drawer', price: 10000, brand: null, specs: 'Manual', localImage: 'Manual Cash Drawer.jpg' }
    ]
  },
  // Thermal Printers
  {
    category: 'Thermal Printers',
    imageUrl: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=600&auto=format&fit=crop',
    items: [
      { hardware_name: 'USB plugin 80mm xPrint thermal printer', price: 16000, brand: 'xPrint', specs: '80mm', localImage: 'USB plugin 80mm xPrint thermal printer.jpg' },
      { hardware_name: 'HZTZ 5890k 58mm Thermal Printer Bluetooth', price: 27000, brand: 'HZTZ', specs: '58mm, Bluetooth', localImage: 'HZTZ 5890k 58mm Thermal Printer Bluetooth.webp' },
      { hardware_name: 'Epson TM-t81 printer', price: 57000, brand: 'Epson', specs: '-', localImage: 'Epson TM-t81 printer.jpg' }
    ]
  }
];

const seed = async () => {
  try {
    // Ensure table and column exist (in case controller hasn't run yet)
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

    try {
      await db.query(`ALTER TABLE hardware ADD COLUMN IF NOT EXISTS category VARCHAR(255)`);
    } catch (e) {
      // ignore if exists
    }

    console.log('Clearing existing hardware...');
    await db.query('DELETE FROM hardware');

    console.log('Inserting new hardware with images...');
    for (const group of hardwareList) {
      // Fetch category image as fallback
      let categoryImageBuffer = null;
      if (group.imageUrl) {
        // console.log(`Fetching category image for ${group.category}...`);
        categoryImageBuffer = await fetchImage(group.imageUrl);
      }

      for (const item of group.items) {
        let itemImageBuffer = null;

        if (item.localImage) {
          console.log(`Reading local image for ${item.hardware_name}...`);
          itemImageBuffer = getLocalImage(item.localImage);
        }

        // Fallback to category image if local image missing or failed
        if (!itemImageBuffer) {
          itemImageBuffer = categoryImageBuffer;
        }

        await db.query(
          `INSERT INTO hardware (hardware_name, brand, category, price, specs, additional_notes, image)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            item.hardware_name,
            item.brand,
            group.category,
            item.price,
            item.specs,
            null, // additional_notes
            itemImageBuffer
          ]
        );
      }
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
