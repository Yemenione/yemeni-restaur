const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = "C:\\Users\\Shiha\\Downloads\\طلب_فيديو_فحص_سينمائي.mp4";
const outputDir = path.join(__dirname, "public", "images", "fahsa-frames");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔄 Extracting frames for Fahsa Canvas sequence...');
try {
    // 24 frames per second to keep count manageable
    execSync(`"${ffmpeg}" -y -i "${inputVideo}" -vf "scale=1280:-1,fps=24" -q:v 5 "${outputDir}\\frame_%04d.jpg"`, { stdio: 'inherit' });
    console.log('✅ Fahsa frames extracted successfully!');
} catch (error) {
    console.error('❌ Error during extraction:', error.message);
    process.exit(1);
}
