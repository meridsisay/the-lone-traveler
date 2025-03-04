'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import PhotoGallery from '@/components/PhotoGallery';
import { getImageUrl } from '@/lib/image-utils';
import { Photo } from '@/components/PhotoGallery';
import fs from 'fs/promises';
import path from 'path';

// Sample photo data
const samplePhotos: Photo[] = [
  {
    id: 1,
    title: 'Sunset in Bali',
    description: 'A breathtaking sunset view from Uluwatu Temple in Bali.',
    location: 'Uluwatu, Bali, Indonesia',
    date: 'July 2023',
    camera: 'Sony A7III',
    image: getImageUrl('/images/bali-sunset.jpg', 1200, 800, 'Sunset in Bali'),
    width: 1200,
    height: 800,
  },
  {
    id: 2,
    title: 'Northern Lights',
    description: 'The magical aurora borealis dancing across the night sky.',
    location: 'Tromsø, Norway',
    date: 'January 2023',
    camera: 'Canon EOS R5',
    image: getImageUrl('/images/northern-lights.jpg', 1200, 900, 'Northern Lights'),
    width: 1200,
    height: 900,
  },
  {
    id: 3,
    title: 'Cherry Blossoms',
    description: 'Cherry blossoms in full bloom at Kyoto\'s Philosopher\'s Path.',
    location: 'Kyoto, Japan',
    date: 'April 2023',
    camera: 'Fujifilm X-T4',
    image: getImageUrl('/images/cherry-blossoms.jpg', 1200, 800, 'Cherry Blossoms'),
    width: 1200,
    height: 800,
  },
  {
    id: 4,
    title: 'Desert Dunes',
    description: 'The endless golden dunes of the Sahara Desert at sunset.',
    location: 'Merzouga, Morocco',
    date: 'October 2022',
    camera: 'Canon EOS R5',
    image: getImageUrl('/images/desert-dunes.jpg', 1200, 800, 'Desert Dunes'),
    width: 1200,
    height: 800,
  },
  {
    id: 5,
    title: 'Santorini Sunset',
    description: 'The iconic blue domes of Santorini against the Aegean sunset.',
    location: 'Oia, Santorini, Greece',
    date: 'June 2023',
    camera: 'Sony A7III',
    image: getImageUrl('/images/santorini-sunset.jpg', 1200, 800, 'Santorini Sunset'),
    width: 1200,
    height: 800,
  },
  {
    id: 6,
    title: 'Machu Picchu',
    description: 'The ancient Incan citadel of Machu Picchu shrouded in morning mist.',
    location: 'Cusco Region, Peru',
    date: 'September 2022',
    camera: 'Nikon Z7',
    image: getImageUrl('/images/machu-picchu.jpg', 1200, 800, 'Machu Picchu'),
    width: 1200,
    height: 800,
  },
  {
    id: 7,
    title: 'Venice Canals',
    description: 'The serene canals of Venice at dawn with gondolas gently floating by.',
    location: 'Venice, Italy',
    date: 'May 2023',
    camera: 'Leica Q2',
    image: getImageUrl('/images/venice-canals.jpg', 1200, 800, 'Venice Canals'),
    width: 1200,
    height: 800,
  },
  {
    id: 8,
    title: 'Great Barrier Reef',
    description: 'The vibrant coral and marine life of Australia\'s Great Barrier Reef.',
    location: 'Queensland, Australia',
    date: 'February 2023',
    camera: 'Underwater: Olympus TG-6',
    image: getImageUrl('/images/great-barrier-reef.jpg', 1200, 800, 'Great Barrier Reef'),
    width: 1200,
    height: 800,
  },
];

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);

  // Fetch uploaded photos
  useEffect(() => {
    const fetchUploadedPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const data = await response.json();
          setUploadedPhotos(data.photos);
        }
      } catch (error) {
        console.error('Error fetching uploaded photos:', error);
      }
    };

    fetchUploadedPhotos();
  }, []);

  // Combine sample photos with uploaded photos
  useEffect(() => {
    setPhotos([...uploadedPhotos, ...samplePhotos]);
  }, [uploadedPhotos]);

  // Extract unique filter options
  const locations = Array.from(new Set(photos.map(photo => photo.location.split(',')[0].trim())));
  const cameras = Array.from(new Set(photos.map(photo => photo.camera?.split(':')[0].trim()).filter(Boolean)));
  const years = Array.from(new Set(photos.map(photo => {
    const match = photo.date.match(/\d{4}/);
    return match ? match[0] : '';
  }).filter(Boolean)));

  // Filter photos based on search and filters
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = searchTerm === '' || 
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (photo.description && photo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      photo.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || photo.location.includes(selectedLocation);
    const matchesCamera = selectedCamera === '' || (photo.camera && photo.camera.includes(selectedCamera));
    const matchesYear = selectedYear === '' || photo.date.includes(selectedYear);
    
    return matchesSearch && matchesLocation && matchesCamera && matchesYear;
  });

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedCamera('');
    setSelectedYear('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Photo Gallery</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore my collection of travel photography from around the world.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white"
            placeholder="Search photos by title, description, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiFilter className="mr-2 -ml-1 h-5 w-5" />
          Filter
          {(selectedLocation || selectedCamera || selectedYear) && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Camera Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Camera
              </label>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
              >
                <option value="">All Cameras</option>
                {cameras.map((camera) => (
                  <option key={camera} value={camera}>
                    {camera}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          {searchTerm && ` matching "${searchTerm}"`}
          {(selectedLocation || selectedCamera || selectedYear) && ' with filters applied'}
        </p>
      </div>

      {/* Photo Gallery */}
      {filteredPhotos.length > 0 ? (
        <PhotoGallery photos={filteredPhotos} />
      ) : (
        <div className="text-center py-12">
          <FiX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No photos found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('');
                clearFilters();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage; 