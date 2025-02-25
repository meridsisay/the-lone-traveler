'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiSearch } from 'react-icons/fi';
import { getImageUrl } from '@/lib/image-utils';

// Sample destinations data
const destinations = [
  {
    id: 1,
    title: 'Santorini, Greece',
    description: 'White-washed buildings with blue domes overlooking the Aegean Sea.',
    image: getImageUrl('/images/santorini.jpg', 800, 600, 'Santorini, Greece'),
    date: 'August 2023',
    continent: 'Europe',
    slug: 'santorini-greece',
  },
  {
    id: 2,
    title: 'Kyoto, Japan',
    description: 'Ancient temples and traditional gardens in the former imperial capital.',
    image: getImageUrl('/images/kyoto.jpg', 800, 600, 'Kyoto, Japan'),
    date: 'April 2023',
    continent: 'Asia',
    slug: 'kyoto-japan',
  },
  {
    id: 3,
    title: 'Machu Picchu, Peru',
    description: 'The ancient Incan citadel set high in the Andes Mountains.',
    image: getImageUrl('/images/machu-picchu.jpg', 800, 600, 'Machu Picchu, Peru'),
    date: 'July 2023',
    continent: 'South America',
    slug: 'machu-picchu-peru',
  },
  {
    id: 4,
    title: 'Bali, Indonesia',
    description: 'Tropical paradise with lush rice terraces, stunning beaches, and vibrant culture.',
    image: getImageUrl('/images/bali-sunset.jpg', 800, 600, 'Bali, Indonesia'),
    date: 'June 2023',
    continent: 'Asia',
    slug: 'bali-indonesia',
  },
  {
    id: 5,
    title: 'Tromsø, Norway',
    description: 'Gateway to the Arctic and one of the best places to witness the Northern Lights.',
    image: getImageUrl('/images/northern-lights.jpg', 800, 600, 'Tromsø, Norway'),
    date: 'January 2023',
    continent: 'Europe',
    slug: 'tromso-norway',
  },
  {
    id: 6,
    title: 'Sahara Desert, Morocco',
    description: 'Vast desert landscape with golden sand dunes stretching to the horizon.',
    image: getImageUrl('/images/sahara.jpg', 800, 600, 'Sahara Desert, Morocco'),
    date: 'March 2023',
    continent: 'Africa',
    slug: 'sahara-desert-morocco',
  },
  {
    id: 7,
    title: 'Venice, Italy',
    description: 'Historic city of canals, gondolas, and Renaissance architecture.',
    image: getImageUrl('/images/venice.jpg', 800, 600, 'Venice, Italy'),
    date: 'May 2023',
    continent: 'Europe',
    slug: 'venice-italy',
  },
  {
    id: 8,
    title: 'Great Barrier Reef, Australia',
    description: 'The world\'s largest coral reef system with incredible marine biodiversity.',
    image: getImageUrl('/images/great-barrier-reef.jpg', 800, 600, 'Great Barrier Reef, Australia'),
    date: 'February 2023',
    continent: 'Oceania',
    slug: 'great-barrier-reef-australia',
  },
];

// Get unique continents for filter
const continents = Array.from(new Set(destinations.map(destination => destination.continent)));

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent ? destination.continent === selectedContinent : true;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destinations</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore the beautiful places I've visited around the world
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 dark:bg-gray-800 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Continent Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedContinent(null)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedContinent === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => setSelectedContinent(continent)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedContinent === continent
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No destinations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {destination.continent}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {destination.description}
                    </p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FiCalendar className="mr-1" />
                      <span>{destination.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage; 