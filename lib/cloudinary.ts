import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

// Upload options interface
interface UploadOptions {
  folder?: string;
  transformation?: object[];
  public_id?: string;
}

// Upload image from base64 or URL
export async function uploadImage(
  file: string,
  options: UploadOptions = {}
): Promise<{ url: string; public_id: string; width: number; height: number }> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: options.folder || 'lignovia',
      transformation: options.transformation,
      public_id: options.public_id,
      resource_type: 'image',
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

// Delete image by public_id
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

// Generate optimized image URL
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    width: options.width,
    height: options.height,
    quality: options.quality || 'auto',
    format: options.format || 'auto',
    crop: 'fill',
    gravity: 'auto',
  });
}

// Predefined image transformations for LIGNOVIA
export const imagePresets = {
  // Product images
  productThumbnail: { width: 200, height: 200, quality: 'auto', format: 'auto' },
  productCard: { width: 400, height: 400, quality: 'auto', format: 'auto' },
  productMain: { width: 800, height: 800, quality: 'auto', format: 'auto' },
  productZoom: { width: 1200, height: 1200, quality: 'auto', format: 'auto' },
  
  // Hero images
  heroDesktop: { width: 1920, height: 800, quality: 'auto', format: 'auto' },
  heroMobile: { width: 768, height: 600, quality: 'auto', format: 'auto' },
  
  // Category images
  categoryCard: { width: 600, height: 400, quality: 'auto', format: 'auto' },
  
  // Avatar
  avatar: { width: 100, height: 100, quality: 'auto', format: 'auto' },
};

// Test connection
export async function testConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    // First check if credentials are set
    const config = cloudinary.config();
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
      return { 
        success: false, 
        error: `Missing credentials: cloud_name=${!!config.cloud_name}, api_key=${!!config.api_key}, api_secret=${!!config.api_secret}` 
      };
    }

    const result = await cloudinary.api.ping();
    return { success: result.status === 'ok' };
  } catch (error) {
    console.error('Cloudinary connection test failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

