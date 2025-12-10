const fs = require('fs');
const path = require('path');

const EXT_DIR = path.join(__dirname, '../extension');
const DIST_DIR = path.join(__dirname, '../dist-extension');

if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
}

// Files to copy
const files = [
    'manifest.json',
    'background.js',
    'content.js',
    'popup.html',
    'popup.js',
    // 'popup.css' // If we had one
];

files.forEach(file => {
    const src = path.join(EXT_DIR, file);
    const dest = path.join(DIST_DIR, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file}`);
    } else {
        console.warn(`Warning: ${file} not found.`);
    }
});

// Copy icons folder if it exists
const iconsSrc = path.join(EXT_DIR, 'icons');
const iconsDest = path.join(DIST_DIR, 'icons');
if (fs.existsSync(iconsSrc)) {
    if (!fs.existsSync(iconsDest)) {
        fs.mkdirSync(iconsDest);
    }
    fs.readdirSync(iconsSrc).forEach(file => {
        fs.copyFileSync(path.join(iconsSrc, file), path.join(iconsDest, file));
    });
    console.log('Copied icons folder');
}

console.log('Extension build complete! Load ./dist-extension in Chrome.');
