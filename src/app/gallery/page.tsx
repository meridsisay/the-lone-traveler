'use client';

import { useState } from 'react';
import PhotoGallery, { Photo } from '@/components/PhotoGallery';
import { FiFilter, FiX } from 'react-icons/fi';
import { getImageUrl } from '@/lib/image-utils';

// Sample photo data
const samplePhotos: Photo[] = [
  {
    id: 1,
    title: 'Sunset in Bali',
    description: 'A breathtaking sunset over the ocean in Bali.',
    location: 'Bali, Indonesia',
    date: 'June 2023',
    camera: 'Sony A7III',
    image: getImageUrl('/images/bali-sunset.jpg', 1200, 800, 'Sunset in Bali'),
    width: 1200,
    height: 800,
  },
  {
    id: 2,
    title: 'Northern Lights',
    description: 'The aurora borealis dancing in the night sky.',
    location: 'Tromsø, Norway',
    date: 'January 2023',
    camera: 'Canon EOS R5',
    image: getImageUrl('/images/northern-lights.jpg', 1200, 900, 'Northern Lights'),
    width: 1200,
    height: 900,
  },
  {
    id: 3,
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon.',
    location: 'Sahara Desert, Morocco',
    date: 'March 2023',
    camera: 'Nikon Z7',
    image: getImageUrl('/images/sahara.jpg', 1200, 800, 'Desert Dunes'),
    width: 1200,
    height: 800,
  },
  {
    id: 4,
    title: 'Venice Canals',
    description: 'Historic canals and architecture of Venice.',
    location: 'Venice, Italy',
    date: 'May 2023',
    camera: 'Fujifilm X-T4',
    image: getImageUrl('/images/venice.jpg', 1200, 800, 'Venice Canals'),
    width: 1200,
    height: 800,
  },
  {
    id: 5,
    title: 'Cherry Blossoms',
    description: 'Beautiful cherry blossoms in full bloom.',
    location: 'Kyoto, Japan',
    date: 'April 2023',
    camera: 'Sony A7III',
    image: getImageUrl('/images/kyoto.jpg', 1200, 800, 'Cherry Blossoms'),
    width: 1200,
    height: 800,
  },
  {
    id: 6,
    title: 'Machu Picchu',
    description: 'The ancient Incan citadel in the clouds.',
    location: 'Machu Picchu, Peru',
    date: 'July 2023',
    camera: 'Canon EOS R5',
    image: getImageUrl('/images/machu-picchu.jpg', 1200, 800, 'Machu Picchu'),
    width: 1200,
    height: 800,
  },
  {
    id: 7,
    title: 'Santorini Sunset',
    description: 'Sunset over the white buildings of Santorini.',
    location: 'Santorini, Greece',
    date: 'August 2023',
    camera: 'Nikon Z7',
    image: getImageUrl('/images/santorini.jpg', 1200, 800, 'Santorini Sunset'),
    width: 1200,
    height: 800,
  },
  {
    id: 8,
    title: 'Great Barrier Reef',
    description: 'Vibrant coral and marine life underwater.',
    location: 'Great Barrier Reef, Australia',
    date: 'February 2023',
    camera: 'Underwater Housing - Sony A7III',
    image: getImageUrl('/images/great-barrier-reef.jpg', 1200, 800, 'Great Barrier Reef'),
    width: 1200,
    height: 800,
  },
];

// Get unique locations for filter
const locations = Array.from(new Set(samplePhotos.map(photo => photo.location)));

const GalleryPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPhotos = selectedLocation
    ? samplePhotos.filter(photo => photo.location === selectedLocation)
    : samplePhotos;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A collection of my favorite photographs from around the world
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedLocation ? `Photos from ${selectedLocation}` : 'All Photos'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} displayed
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter size={16} />
              <span>Filter by Location</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">Locations</span>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto p-2">
                  <button
                    onClick={() => {
                      setSelectedLocation(null);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedLocation === null
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Locations
                  </button>
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        selectedLocation === location
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery photos={filteredPhotos} />
      </div>
    </div>
  );
};

export default GalleryPage; 