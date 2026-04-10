/**
 * Download Quran data for offline use
 * Run with: node scripts/download-quran-data.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.alquran.cloud/v1';
const OUTPUT_DIR = path.join(__dirname, '..', 'data');

async function downloadJSON(url, filename) {
    console.log(`Downloading ${filename}...`);
    const response = await fetch(url);
    const data = await response.json();
    
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved to ${filepath}`);
    return data;
}

async function main() {
    // Create data directory
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Download Quran with Tajweed
    await downloadJSON(
        `${API_BASE}/quran/quran-tajweed`,
        'quran-tajweed.json'
    );

    // Download English translation (Saheeh International)
    await downloadJSON(
        `${API_BASE}/quran/en.sahih`,
        'translation-en-sahih.json'
    );

    // Download Surah list
    await downloadJSON(
        `${API_BASE}/surah`,
        'surahs.json'
    );

    console.log('\n✅ All data downloaded successfully!');
    console.log(`Data saved to: ${OUTPUT_DIR}`);
    console.log('\nTo use in plugin:');
    console.log('1. Copy the data folder to your plugin folder');
    console.log('2. Update main.js to load from local files when offline');
}

main().catch(console.error);
