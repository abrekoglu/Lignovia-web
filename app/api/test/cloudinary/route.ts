import { NextResponse } from 'next/server';
import { testConnection, uploadImage, getOptimizedUrl, imagePresets } from '@/lib/cloudinary';

// GET: Test Cloudinary connection
export async function GET() {
  try {
    // Check if environment variables are set
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudinary credentials not configured',
          details: {
            cloud_name: !!cloudName,
            api_key: !!apiKey,
            api_secret: !!apiSecret,
          },
        },
        { status: 500 }
      );
    }

    // Test connection
    const connectionResult = await testConnection();

    if (!connectionResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to Cloudinary',
          details: connectionResult.error,
          hint: 'Check your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env file',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cloudinary connection successful!',
      cloud_name: cloudName,
      presets: Object.keys(imagePresets),
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST: Test image upload (with a sample image URL)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    // Use a default test image if none provided
    const testImageUrl =
      imageUrl ||
      'https://res.cloudinary.com/demo/image/upload/sample.jpg';

    // Upload the image
    const result = await uploadImage(testImageUrl, {
      folder: 'lignovia/test',
    });

    // Generate optimized URLs with different presets
    const optimizedUrls = {
      thumbnail: getOptimizedUrl(result.public_id, imagePresets.productThumbnail),
      card: getOptimizedUrl(result.public_id, imagePresets.productCard),
      main: getOptimizedUrl(result.public_id, imagePresets.productMain),
    };

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully!',
      result: {
        original: result,
        optimized: optimizedUrls,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

