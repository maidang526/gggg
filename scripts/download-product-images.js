const fs = require('fs');
const path = require('path');
const https = require('https');

const imageUrls = {
  // 环保产品图片
  'solar-station.jpg': 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
  'bamboo-set.jpg': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa',
  'shower-head.jpg': 'https://images.unsplash.com/photo-1604709177225-055f99402ea3',
  'smart-bin.jpg': 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9',
  'plant-box.jpg': 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
  
  // 二手商品图片
  'ipad.jpg': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
  'bike.jpg': 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7',
  'monitor.jpg': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
  'headphone.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const targetDir = path.join(process.cwd(), 'public', 'products');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filepath = path.join(targetDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(`${url}?w=800&q=80`, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {
        console.error(`Error downloading ${filename}:`, err.message);
        reject(err);
      });
    });
  });
};

const downloadAllImages = async () => {
  try {
    for (const [filename, url] of Object.entries(imageUrls)) {
      await downloadImage(url, filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 