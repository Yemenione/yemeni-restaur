const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

const inputVideo = "C:\\Users\\Shiha\\Downloads\\طلب_فيديوهات_المندي_وصناعتها.mp4";
const outputVideo = "public\\mandi-scroll.mp4";

console.log('🔄 Loading FFmpeg binary...');
console.log('⏳ Transcoding video for perfect GSAP scrubbing (Adding Keyframes)... This may take a moment.');

try {
    // -y overrides output, -g 1 forces a keyframe everywhere, -an removes audio (unnecessary for scroll video), 
    // -vcodec libx264 ensures maximum browser compatibility.
    execSync(`"${ffmpeg}" -y -i "${inputVideo}" -vcodec libx264 -g 1 -preset fast -crf 24 -an "${outputVideo}"`, { stdio: 'inherit' });
    console.log('✅ Video transcoded successfully! GSAP should now scroll it perfectly.');
} catch (error) {
    console.error('❌ Error during transcoding:', error.message);
    process.exit(1);
}
