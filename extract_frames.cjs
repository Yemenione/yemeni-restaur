const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = "C:\\Users\\Shiha\\Downloads\\طلب_فيديوهات_المندي_وصناعتها.mp4";
const outputDir = path.join(__dirname, "public", "images", "mandi-frames");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔄 Extracting frames for Canvas sequence...');
try {
    // 24 frames per second to keep count manageable (around 200 frames total for an 8s video)
    execSync(`"${ffmpeg}" -y -i "${inputVideo}" -vf "scale=1280:-1,fps=24" -q:v 5 "${outputDir}\\frame_%04d.jpg"`, { stdio: 'inherit' });
    console.log('✅ Frames extracted successfully!');
} catch (error) {
    console.error('❌ Error during extraction:', error.message);
    process.exit(1);
}
