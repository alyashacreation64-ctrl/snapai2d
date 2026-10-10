const MAX_DIMENSION = 768;
const JPEG_QUALITY = 0.6;

export interface CompressedImage {
  base64: string;
  mimeType: string;
}

export async function compressImage(file: File): Promise<CompressedImage> {
  const dataUrl = await fileToDataUrl(file);

  if (file.type === 'image/jpeg' && file.size < 200 * 1024) {
    return { base64: dataUrl.split(',')[1], mimeType: 'image/jpeg' };
  }

  const img = await loadImage(dataUrl);

  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width >= height) {
      height = Math.round((height / width) * MAX_DIMENSION);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width / height) * MAX_DIMENSION);
      height = MAX_DIMENSION;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context for image compression.');
  ctx.drawImage(img, 0, 0, width, height);

  const compressed = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  return {
    base64: compressed.split(',')[1],
    mimeType: 'image/jpeg',
  };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Could not read the image file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load the image for processing.'));
    img.src = src;
  });
}
