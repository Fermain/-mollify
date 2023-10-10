// 🌐 packages/tts/lib/browserTTS/convertBlobToDataUrl.ts 

/**
 * Converts a Blob to a data URL. 🌟
 * @param {Blob} blob Blob to be converted
 * @returns {Promise<string>} Data URL representing the Blob's contents
 */
async function convertBlobToDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(blob);
    });
  }
  
  export { convertBlobToDataUrl };
  