import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Define the path to the uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Check if the directory exists
    try {
      await fs.access(uploadsDir);
    } catch (error) {
      // If the directory doesn't exist, create it
      await fs.mkdir(uploadsDir, { recursive: true });
      // Return empty array if no photos yet
      return NextResponse.json({ photos: [] });
    }
    
    // Read the directory contents
    const files = await fs.readdir(uploadsDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });
    
    // Create photo objects for each image
    const photos = imageFiles.map((file, index) => {
      const filePath = `/uploads/${file}`;
      const fileName = path.basename(file, path.extname(file));
      
      // Extract information from the filename if it follows our naming convention
      // Example: sunset-in-bali-12345678.jpg
      const nameParts = fileName.split('-');
      const id = 1000 + index; // Start IDs from 1000 to avoid conflicts with sample photos
      
      // Create a title from the filename
      let title = nameParts
        .slice(0, -1) // Remove the last part (the UUID)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      // If no title could be extracted, use a default
      if (!title) {
        title = `Uploaded Photo ${id}`;
      }
      
      // Create a photo object
      return {
        id,
        title,
        description: `Uploaded photo: ${title}`,
        location: 'Unknown Location',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
        camera: 'Unknown Camera',
        image: filePath,
        width: 1200, // Default width
        height: 800, // Default height
      };
    });
    
    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Error fetching photos' },
      { status: 500 }
    );
  }
} 