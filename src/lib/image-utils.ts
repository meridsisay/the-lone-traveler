/**
 * Utility functions for handling images
 */

/**
 * Get the image URL for a given path
 * If the path starts with http or https, it's an external URL
 * Otherwise, it's a local path that should be prefixed with the base URL
 * If the path doesn't exist, return a placeholder image
 */
export function getImageUrl(path: string, width = 1200, height = 800, text?: string): string {
  // If it's an external URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // For local development, use placeholder images
  // In production, you would check if the file exists and return a placeholder if it doesn't
  if (path.startsWith('/images/') && process.env.NODE_ENV === 'development') {
    // Use our placeholder API
    return `/api/placeholder?width=${width}&height=${height}&text=${text || path.split('/').pop()?.split('.')[0] || 'Image'}`;
  }

  // Otherwise, return the local path
  return path;
}

/**
 * Generate a placeholder image URL
 */
export function getPlaceholderImage(width = 1200, height = 800, text = 'Placeholder Image', bgColor = '3b82f6', textColor = 'ffffff'): string {
  return `/api/placeholder?width=${width}&height=${height}&text=${text}&bgColor=${bgColor}&textColor=${textColor}`;
} 