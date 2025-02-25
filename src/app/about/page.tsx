import Image from 'next/image';
import { FiCamera, FiMap, FiGlobe, FiBookOpen } from 'react-icons/fi';
import { getPlaceholderImage } from '@/lib/image-utils';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl max-w-3xl mx-auto">
              The story behind The Lone Traveler
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={getPlaceholderImage(800, 1000, 'Alex - The Lone Traveler', '3b82f6', 'ffffff')}
              alt="Photographer profile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Hello, I'm Alex
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I'm a passionate traveler and photographer based in New York. My journey with photography began over 10 years ago when I picked up my first DSLR camera before a trip to Southeast Asia.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              What started as a hobby quickly turned into a passion that has taken me to over 40 countries across 6 continents. Through my lens, I aim to capture the essence of each destination - from breathtaking landscapes to vibrant cultural moments.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              The Lone Traveler is my platform to share these experiences with you. I hope my photographs inspire you to explore this beautiful world we live in.
            </p>
          </div>
        </div>

        {/* My Approach */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            My Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <FiCamera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Photography
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                I focus on natural light and authentic moments, minimizing post-processing to preserve the true essence of each scene.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <FiMap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Exploration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                I venture beyond tourist hotspots to discover hidden gems and authentic local experiences.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <FiGlobe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Cultural Immersion
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                I believe in respectful cultural exchange and learning from local communities during my travels.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <FiBookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Storytelling
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Each photograph tells a story, capturing a moment in time that conveys the spirit of a place.
              </p>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            My Equipment
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cameras
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sony Alpha A7III (Primary)</li>
                  <li>• Canon EOS R5</li>
                  <li>• DJI Mavic 3 Pro (Drone)</li>
                  <li>• GoPro Hero 11 Black (Action)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Lenses
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Sony 24-70mm f/2.8 GM</li>
                  <li>• Sony 16-35mm f/2.8 GM</li>
                  <li>• Sony 70-200mm f/2.8 GM</li>
                  <li>• Canon RF 50mm f/1.2L USM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 