const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = '../Imagenes/Mockup/bb552083a851c08bac067e8cc7fa3cb5.png';
const outputPath = '../Imagenes/Mockup/bb552083a851c08bac067e8cc7fa3cb5-transparent.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    const width = this.width;
    const height = this.height;
    const data = this.data;

    console.log(`Cleaning mockup: ${width}x${height}`);

    // 1. Map original background transparent pixels
    const isOriginalBg = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      if (data[i * 4 + 3] === 0) {
        isOriginalBg[i] = 1;
      }
    }

    // 2. Flood fill the inner screen area
    const visited = new Uint8Array(width * height);
    const queue = [];
    const startX = Math.floor(width / 2);
    const startY = Math.floor(height / 2);

    queue.push([startX, startY]);
    visited[startY * width + startX] = 1;

    function getPixel(x, y) {
      const idx = (width * y + x) << 2;
      return {
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
        a: data[idx + 3]
      };
    }

    let screenPixelCount = 0;

    while (queue.length > 0) {
      const [x, y] = queue.shift();
      screenPixelCount++;

      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const index = ny * width + nx;
          if (!visited[index]) {
            const pixel = getPixel(nx, ny);
            // Stop at black bezel or Dynamic Island (R, G, B < 50)
            const isBoundary = pixel.r < 50 && pixel.g < 50 && pixel.b < 50;
            if (!isBoundary && pixel.a > 0) {
              visited[index] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    console.log(`Initial screen pixels found: ${screenPixelCount}`);

    // Set initial screen pixels to transparent
    for (let i = 0; i < width * height; i++) {
      if (visited[i] === 1) {
        data[i * 4 + 3] = 0;
      }
    }

    // 3. Shave the inner screen border (eat light/gray pixels adjacent to screen)
    // We will do 4 iterations to thoroughly eat any white/gray transition pixels
    for (let step = 0; step < 4; step++) {
      const toClear = [];
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          if (visited[idx] === 0) {
            const adj = [
              (y - 1) * width + x,
              (y + 1) * width + x,
              y * width + (x - 1),
              y * width + (x + 1)
            ];
            const isAdjacentToScreen = adj.some(a => visited[a] === 1);
            if (isAdjacentToScreen) {
              const pixelIdx = idx << 2;
              const r = data[pixelIdx];
              const g = data[pixelIdx + 1];
              const b = data[pixelIdx + 2];
              
              // If it's not very dark black (threshold 35), clear it
              if (r > 35 || g > 35 || b > 35) {
                toClear.push(idx);
              }
            }
          }
        }
      }
      for (const idx of toClear) {
        visited[idx] = 1;
        data[idx * 4 + 3] = 0; // Make transparent
      }
      console.log(`Shave inner screen step ${step + 1}: cleared ${toClear.length} transition pixels.`);
    }

    // 4. Shave the outer phone border (remove the white halo from the outside)
    // We will do 3 iterations
    for (let step = 0; step < 3; step++) {
      const toClear = [];
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          // Must be part of the phone (not transparent, not screen)
          if (data[idx * 4 + 3] > 0 && visited[idx] === 0) {
            const adj = [
              (y - 1) * width + x,
              (y + 1) * width + x,
              y * width + (x - 1),
              y * width + (x + 1)
            ];
            const isAdjacentToBg = adj.some(a => isOriginalBg[a] === 1 || data[a * 4 + 3] === 0);
            if (isAdjacentToBg) {
              const pixelIdx = idx << 2;
              const r = data[pixelIdx];
              const g = data[pixelIdx + 1];
              const b = data[pixelIdx + 2];
              
              // If it's a light border pixel (R, G, B > 100)
              if (r > 100 && g > 100 && b > 100) {
                toClear.push(idx);
              }
            }
          }
        }
      }
      for (const idx of toClear) {
        isOriginalBg[idx] = 1; // Mark as background for next iteration
        data[idx * 4 + 3] = 0; // Make transparent
      }
      console.log(`Shave outer halo step ${step + 1}: cleared ${toClear.length} pixels.`);
    }

    // Pack and save
    this.pack().pipe(fs.createWriteStream(outputPath))
      .on('finish', () => {
        console.log(`Saved clean mockup to: ${outputPath}`);
      });
  })
  .on('error', (err) => {
    console.error('Error cleaning mockup:', err);
  });
