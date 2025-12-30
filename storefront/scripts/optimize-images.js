const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PRODUCTS_DIR = path.join(PUBLIC_DIR, 'products');

const TARGET_WIDTH = 1200; // Good balance for full screen / zoom
const LOGO_WIDTH = 300;

async function optimizeImages() {
    console.log('Starting image optimization...');

    // Optimize Logo
    const logoPath = path.join(PUBLIC_DIR, 'navlogo.png');
    if (fs.existsSync(logoPath)) {
        console.log('Optimizing Logo...');
        // Rename original for safety
        const originalLogoPath = path.join(PUBLIC_DIR, 'navlogo-original.png');
        if (!fs.existsSync(originalLogoPath)) {
            fs.renameSync(logoPath, originalLogoPath);
        }

        await sharp(originalLogoPath)
            .resize({ width: LOGO_WIDTH })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(logoPath);
        console.log('Logo optimized.');
    }

    // Optimize Products
    if (fs.existsSync(PRODUCTS_DIR)) {
        const files = fs.readdirSync(PRODUCTS_DIR);
        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i) && !file.includes('-optimized')) {
                const filePath = path.join(PRODUCTS_DIR, file);
                console.log(`Optimizing ${file}...`);

                // Create temp buffer
                const buffer = fs.readFileSync(filePath);

                // Overwrite with optimized version (converted to JPEG for size) and keep same name if possible
                // But user DB expects specific extensions. 
                // Using .png input -> .jpg output might break DB links.
                // Recommendation: Keep extension but compress heavy.

                if (file.endsWith('.png')) {
                    // Start with resizing
                    await sharp(buffer)
                        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
                        .png({ quality: 70, compressionLevel: 9 })
                        .toFile(filePath); // Overwrite
                } else {
                    await sharp(buffer)
                        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
                        .jpeg({ quality: 80 })
                        .toFile(filePath); // Overwrite
                }
                console.log(`Optimized ${file}`);
            }
        }
    }
    console.log('Optimization complete.');
}

optimizeImages().catch(console.error);
