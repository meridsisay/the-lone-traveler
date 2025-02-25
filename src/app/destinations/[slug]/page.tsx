'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiArrowLeft, FiCamera } from 'react-icons/fi';
import PhotoGallery, { Photo } from '@/components/PhotoGallery';
import { getImageUrl } from '@/lib/image-utils';

// Sample destinations data
const destinations = [
  {
    id: 1,
    title: 'Santorini, Greece',
    description: 'White-washed buildings with blue domes overlooking the Aegean Sea.',
    fullDescription: `
      Santorini is one of the most iconic Greek islands, known for its stunning white-washed buildings with blue domes that cling to the cliffs overlooking the Aegean Sea. The island was formed from a volcanic eruption, creating its unique crescent shape and dramatic caldera views.
      
      During my visit in August 2023, I spent a week exploring the island's charming villages, beautiful beaches, and ancient ruins. The sunsets in Oia are truly magical, painting the white buildings in golden hues as the sun dips below the horizon.
      
      The island's unique architecture, with its cubic houses, blue-domed churches, and narrow winding streets, creates a photographer's paradise. Every corner offers a new perspective and a perfect frame for capturing the essence of this beautiful island.
    `,
    image: getImageUrl('/images/santorini.jpg', 1920, 1080, 'Santorini, Greece'),
    date: 'August 2023',
    continent: 'Europe',
    location: 'Cyclades Islands, Greece',
    slug: 'santorini-greece',
    photos: [
      {
        id: 1,
        title: 'Oia Sunset',
        description: 'The famous sunset view from Oia village.',
        location: 'Oia, Santorini',
        date: 'August 15, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/santorini.jpg', 1200, 800, 'Oia Sunset'),
        width: 1200,
        height: 800,
      },
      {
        id: 2,
        title: 'Blue Domes',
        description: 'Iconic blue domes against the Aegean Sea.',
        location: 'Oia, Santorini',
        date: 'August 16, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/santorini.jpg', 1200, 800, 'Blue Domes'),
        width: 1200,
        height: 800,
      },
      {
        id: 3,
        title: 'Caldera View',
        description: 'Panoramic view of the volcanic caldera.',
        location: 'Fira, Santorini',
        date: 'August 17, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/santorini.jpg', 1200, 800, 'Caldera View'),
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 2,
    title: 'Kyoto, Japan',
    description: 'Ancient temples and traditional gardens in the former imperial capital.',
    fullDescription: `
      Kyoto, the former imperial capital of Japan, is a city that perfectly balances tradition and modernity. With over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites, it's a cultural treasure trove.
      
      I visited Kyoto in April 2023 during cherry blossom season, which transformed the city into a pink wonderland. The sight of ancient temples framed by blooming sakura trees created unforgettable scenes that I was eager to capture with my camera.
      
      From the golden pavilion of Kinkaku-ji to the thousands of vermilion torii gates at Fushimi Inari Shrine, each location offered unique photographic opportunities. The traditional gardens, with their carefully arranged rocks, water features, and manicured plants, showcase the Japanese aesthetic of harmony with nature.
    `,
    image: getImageUrl('/images/kyoto.jpg', 1920, 1080, 'Kyoto, Japan'),
    date: 'April 2023',
    continent: 'Asia',
    location: 'Kansai Region, Japan',
    slug: 'kyoto-japan',
    photos: [
      {
        id: 1,
        title: 'Cherry Blossoms at Philosopher\'s Path',
        description: 'Cherry trees in full bloom along the canal.',
        location: 'Philosopher\'s Path, Kyoto',
        date: 'April 5, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/kyoto.jpg', 1200, 800, 'Cherry Blossoms'),
        width: 1200,
        height: 800,
      },
      {
        id: 2,
        title: 'Golden Pavilion',
        description: 'Kinkaku-ji Temple reflecting in the pond.',
        location: 'Kinkaku-ji, Kyoto',
        date: 'April 6, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/kyoto.jpg', 1200, 800, 'Golden Pavilion'),
        width: 1200,
        height: 800,
      },
      {
        id: 3,
        title: 'Fushimi Inari Shrine',
        description: 'The famous path of thousands of torii gates.',
        location: 'Fushimi Inari Taisha, Kyoto',
        date: 'April 7, 2023',
        camera: 'Sony A7III',
        image: getImageUrl('/images/kyoto.jpg', 1200, 800, 'Fushimi Inari Shrine'),
        width: 1200,
        height: 800,
      },
    ],
  },
  // Add more destinations as needed
];

const DestinationPage = () => {
  const { slug } = useParams();
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Destination not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The destination you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/destinations"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {destination.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>{destination.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/destinations"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Destinations
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About {destination.title}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {destination.fullDescription.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Destination Info
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {destination.location}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Continent
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {destination.continent}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Visited
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {destination.date}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Camera Used
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    Sony A7III
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Photo Gallery
          </h2>
          <PhotoGallery photos={destination.photos} />
        </div>
      </div>
    </div>
  );
};

export default DestinationPage; 