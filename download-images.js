const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'earth-hero.jpg',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'ocean-hero.jpg',
    url: 'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'climate-hero.jpg',
    url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'plastic-free.jpg',
    url: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'climate-energy.jpg',
    url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'forest.jpg',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'climate-report.jpg',
    url: 'https://images.unsplash.com/photo-1581075362882-aa16a7d4494b?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'ocean-pollution.jpg',
    url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1920'
  },
  {
    name: 'renewable-energy.jpg',
    url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1920'
  }
];

const outputDir = path.join(__dirname, 'public', 'images');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, image.name));
    
    https.get(image.url, response => {
      const totalBytes = parseInt(response.headers['content-length'], 10);
      let downloadedBytes = 0;

      response.pipe(file);

      response.on('data', chunk => {
        downloadedBytes += chunk.length;
        const progress = (downloadedBytes / totalBytes * 100).toFixed(2);
        process.stdout.write(`\r下载 ${image.name}: ${progress}%`);
      });

      file.on('finish', () => {
        process.stdout.write(`\r下载 ${image.name}: 完成!   \n`);
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(path.join(outputDir, image.name), () => {});
      reject(err);
    });
  });
}

console.log('开始并行下载图片...\n');

Promise.all(images.map(image => downloadImage(image)))
  .then(() => {
    console.log('\n所有图片下载完成！');
  })
  .catch(err => {
    console.error('\n下载过程中出现错误:', err);
  }); 