const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const profileImage = path.join(publicDir, 'profile.jpg');

async function generateFavicons() {
  console.log('🎨 Generating favicons from profile image...');
  
  // Create a circular favicon from the profile image
  const createCircularFavicon = async (size, outputPath) => {
    const roundedCorners = Buffer.from(
      `<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`
    );
    
    await sharp(profileImage)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated: ${path.basename(outputPath)}`);
  };

  // Create square favicon (for ICO)
  const createSquareFavicon = async (size, outputPath) => {
    await sharp(profileImage)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated: ${path.basename(outputPath)}`);
  };

  try {
    // Generate various favicon sizes
    await createSquareFavicon(16, path.join(publicDir, 'favicon-16x16.png'));
    await createSquareFavicon(32, path.join(publicDir, 'favicon-32x32.png'));
    await createSquareFavicon(180, path.join(publicDir, 'apple-touch-icon.png'));
    await createSquareFavicon(192, path.join(publicDir, 'android-chrome-192x192.png'));
    await createSquareFavicon(512, path.join(publicDir, 'android-chrome-512x512.png'));

    // Create favicon.ico from the 32x32 PNG
    // Note: For a proper .ico file, you'd need a dedicated library
    // For now, we'll use the 32x32 PNG renamed as favicon.ico workaround
    // Or better yet, create a simple square version
    await sharp(profileImage)
      .resize(48, 48, { fit: 'cover', position: 'centre' })
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Generated: favicon.ico');

    console.log('\n🖼️ Generating Open Graph image...');
    
    // Create OG image (1200x630) - Profile on left with text overlay
    const ogWidth = 1200;
    const ogHeight = 630;
    
    // Create gradient background
    const gradient = Buffer.from(`
      <svg width="${ogWidth}" height="${ogHeight}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0f;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#0f1419;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0f;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00ff88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        
        <!-- Decorative grid lines -->
        <g opacity="0.1" stroke="#00d4ff">
          ${Array.from({length: 20}, (_, i) => 
            `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${ogHeight}" stroke-width="1"/>`
          ).join('')}
          ${Array.from({length: 11}, (_, i) => 
            `<line x1="0" y1="${i * 60}" x2="${ogWidth}" y2="${i * 60}" stroke-width="1"/>`
          ).join('')}
        </g>
        
        <!-- Circular profile frame -->
        <circle cx="200" cy="315" r="155" fill="none" stroke="url(#textGrad)" stroke-width="3"/>
        <circle cx="200" cy="315" r="165" fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.3"/>
        
        <!-- Text content -->
        <text x="420" y="200" font-family="Arial, sans-serif" font-size="28" fill="#888888" letter-spacing="4">
          FULL STACK DEVELOPER
        </text>
        <text x="420" y="280" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#ffffff">
          Alejandro Lamas
        </text>
        <text x="420" y="350" font-family="Arial, sans-serif" font-size="24" fill="#00d4ff">
          Project Manager • Ex-CTO • +10 años experiencia
        </text>
        
        <!-- Neural OS badge -->
        <rect x="420" y="400" width="200" height="50" rx="25" fill="none" stroke="url(#textGrad)" stroke-width="2"/>
        <text x="520" y="433" font-family="Arial, sans-serif" font-size="20" fill="url(#textGrad)" text-anchor="middle">
          NEURAL OS 2030
        </text>
        
        <!-- URL -->
        <text x="420" y="530" font-family="Arial, sans-serif" font-size="20" fill="#666666">
          alejandrolamas.es
        </text>
        
        <!-- Decorative elements -->
        <circle cx="1100" cy="100" r="50" fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.2"/>
        <circle cx="1100" cy="100" r="30" fill="none" stroke="#00ff88" stroke-width="1" opacity="0.3"/>
        <circle cx="1050" cy="530" r="80" fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.15"/>
      </svg>
    `);

    // Resize profile for OG image
    const profileForOG = await sharp(profileImage)
      .resize(300, 300, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer();

    // Create circular mask for profile
    const circleMask = Buffer.from(`
      <svg width="300" height="300">
        <circle cx="150" cy="150" r="150" fill="white"/>
      </svg>
    `);

    const circularProfile = await sharp(profileForOG)
      .composite([{
        input: circleMask,
        blend: 'dest-in'
      }])
      .png()
      .toBuffer();

    // Compose final OG image
    await sharp(gradient)
      .composite([
        {
          input: circularProfile,
          top: 165,
          left: 50
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'og-image.jpg'));
    
    console.log('✅ Generated: og-image.jpg');
    
    console.log('\n✨ All images generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('   - favicon.ico');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - apple-touch-icon.png');
    console.log('   - android-chrome-192x192.png');
    console.log('   - android-chrome-512x512.png');
    console.log('   - og-image.jpg');
    
  } catch (error) {
    console.error('❌ Error generating images:', error);
    process.exit(1);
  }
}

generateFavicons();
