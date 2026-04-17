/**
 * Image Helper Utility
 * Provides canvas-based background removal for signature/stamp images
 */

/**
 * Removes white/near-white background from an image file
 * @param {File} imageFile - The image file to process
 * @returns {Promise<Blob>} PNG blob with transparent background
 */
export async function removeWhiteBackground(imageFile) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Create canvas with same dimensions as image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Get image pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Replace white/near-white pixels with transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is white or near-white (threshold: 240)
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Make fully transparent
        }
      }
      
      // Put modified image data back
      ctx.putImageData(imageData, 0, 0);
      
      // Convert canvas to PNG blob with transparency
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to process image'));
        }
      }, 'image/png');
      
      // Clean up object URL
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };
    
    // Load image from file
    img.src = URL.createObjectURL(imageFile);
  });
}

/**
 * Converts a File object to base64 data URL
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 data URL
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
