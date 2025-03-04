import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Get file extension and create a unique filename
    const fileExtension = path.extname(file.name);
    const originalFilename = path.basename(file.name, fileExtension);
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueFilename = `${sanitizedFilename}-${uuidv4().substring(0, 8)}${fileExtension}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where the file will be saved
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);
    
    // Return the path to the uploaded file (relative to the public directory)
    return NextResponse.json({ 
      success: true,
      filePath: `/uploads/${uniqueFilename}`,
      filename: uniqueFilename,
      originalName: file.name,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 