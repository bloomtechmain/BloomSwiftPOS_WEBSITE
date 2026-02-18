import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../public/Assets');
const outputDir = join(__dirname, '../public/Assets/optimized');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Responsive image sizes
const sizes = [320, 640, 1024, 1920];

// Convert images to WebP with multiple sizes
const convertImages = async () => {
  try {
    const files = readdirSync(inputDir);
    
    for (const file of files) {
      const inputPath = join(inputDir, file);
      const stat = statSync(inputPath);
      
      // Skip directories
      if (stat.isDirectory()) continue;
      
      // Only process image files
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        console.log(`\nProcessing: ${file}`);
        
        const baseName = file.replace(/\.(jpg|jpeg|png)$/i, '');
        
        // Generate responsive sizes
        for (const size of sizes) {
          const outputPath = join(outputDir, `${baseName}-${size}w.webp`);
          
          try {
            await sharp(inputPath)
              .resize(size, null, { 
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85, effort: 6 })
              .toFile(outputPath);
            
            const stats = statSync(outputPath);
            const sizeKB = (stats.size / 1024).toFixed(2);
            console.log(`  ✓ ${size}w: ${sizeKB} KB`);
          } catch (err) {
            console.error(`  ✗ Error creating ${size}w:`, err.message);
          }
        }
        
        // Also create a standard WebP version
        const standardOutput = join(outputDir, `${baseName}.webp`);
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(standardOutput);
        
        const originalStats = statSync(inputPath);
        const optimizedStats = statSync(standardOutput);
        const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
        
        console.log(`  ✓ Standard: ${(optimizedStats.size / 1024).toFixed(2)} KB (${reduction}% smaller)`);
      }
    }
    
    console.log('\n✅ Image conversion complete!');
    console.log(`📁 Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
};

convertImages();
