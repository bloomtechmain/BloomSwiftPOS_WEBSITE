import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_ASSETS = path.join(__dirname, '../public/Assets');
const OPTIMIZED_DIR = path.join(PUBLIC_ASSETS, 'optimized');

// Responsive image widths
const WIDTHS = [320, 640, 1024, 1920];

// Quality settings for different formats
const QUALITY = {
  webp: 82,      // High quality WebP
  avif: 75,      // AVIF is more efficient
  jpeg: 85,      // JPEG fallback
  png: 90        // PNG compression
};

// Ensure optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Get all image files recursively
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip optimized directory
      if (!filePath.includes('optimized')) {
        getAllImageFiles(filePath, fileList);
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Optimize a single image
async function optimizeImage(imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const relativePath = path.relative(PUBLIC_ASSETS, imagePath);
  
  console.log(`\n📸 Optimizing: ${relativePath}`);

  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    console.log(`   Original: ${metadata.width}x${metadata.height} - ${(fs.statSync(imagePath).size / 1024).toFixed(1)}KB`);

    // Generate WebP versions at different widths
    for (const width of WIDTHS) {
      // Only resize if image is larger than target width
      if (metadata.width >= width) {
        const outputPath = path.join(OPTIMIZED_DIR, `${fileName}-${width}w.webp`);
        
        await image
          .clone()
          .resize(width, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: QUALITY.webp, effort: 6 })
          .toFile(outputPath);

        const size = (fs.statSync(outputPath).size / 1024).toFixed(1);
        console.log(`   ✓ Created ${width}w WebP: ${size}KB`);
      }
    }

    // Generate full-size WebP
    const fullWebpPath = path.join(OPTIMIZED_DIR, `${fileName}.webp`);
    await image
      .clone()
      .webp({ quality: QUALITY.webp, effort: 6 })
      .toFile(fullWebpPath);

    const fullSize = (fs.statSync(fullWebpPath).size / 1024).toFixed(1);
    console.log(`   ✓ Created full WebP: ${fullSize}KB`);

    // Compress original format (for fallback)
    const ext = path.extname(imagePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      const compressedOriginal = path.join(OPTIMIZED_DIR, `${fileName}.jpg`);
      await image
        .clone()
        .jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true })
        .toFile(compressedOriginal);
      
      const compSize = (fs.statSync(compressedOriginal).size / 1024).toFixed(1);
      console.log(`   ✓ Compressed JPEG: ${compSize}KB`);
    } else if (ext === '.png') {
      const compressedOriginal = path.join(OPTIMIZED_DIR, `${fileName}.png`);
      await image
        .clone()
        .png({ quality: QUALITY.png, compressionLevel: 9, effort: 10 })
        .toFile(compressedOriginal);
      
      const compSize = (fs.statSync(compressedOriginal).size / 1024).toFixed(1);
      console.log(`   ✓ Compressed PNG: ${compSize}KB`);
    }

  } catch (error) {
    console.error(`   ❌ Error optimizing ${relativePath}:`, error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Source directory: ${PUBLIC_ASSETS}`);
  console.log(`📁 Output directory: ${OPTIMIZED_DIR}\n`);

  const imageFiles = getAllImageFiles(PUBLIC_ASSETS);
  console.log(`Found ${imageFiles.length} images to optimize\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const imagePath of imageFiles) {
    try {
      await optimizeImage(imagePath);
      successCount++;
    } catch (error) {
      console.error(`Failed to optimize ${imagePath}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Image optimization complete!');
  console.log(`   Successful: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log('='.repeat(60) + '\n');

  // Calculate total size savings
  const optimizedFiles = fs.readdirSync(OPTIMIZED_DIR);
  let totalOptimizedSize = 0;
  optimizedFiles.forEach(file => {
    const filePath = path.join(OPTIMIZED_DIR, file);
    totalOptimizedSize += fs.statSync(filePath).size;
  });

  console.log(`📊 Total optimized output: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
}

main().catch(console.error);
