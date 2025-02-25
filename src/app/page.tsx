import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { getImageUrl, getPlaceholderImage } from "@/lib/image-utils";

// Sample data for featured destinations
const featuredDestinations = [
  {
    id: 1,
    title: "Santorini, Greece",
    description: "White-washed buildings with blue domes overlooking the Aegean Sea.",
    image: "/images/santorini.jpg",
    slug: "santorini-greece",
  },
  {
    id: 2,
    title: "Kyoto, Japan",
    description: "Ancient temples and traditional gardens in the former imperial capital.",
    image: "/images/kyoto.jpg",
    slug: "kyoto-japan",
  },
  {
    id: 3,
    title: "Machu Picchu, Peru",
    description: "The ancient Incan citadel set high in the Andes Mountains.",
    image: "/images/machu-picchu.jpg",
    slug: "machu-picchu-peru",
  },
];

// Sample data for recent photos
const recentPhotos = [
  {
    id: 1,
    title: "Sunset in Bali",
    location: "Bali, Indonesia",
    image: "/images/bali-sunset.jpg",
  },
  {
    id: 2,
    title: "Northern Lights",
    location: "Tromsø, Norway",
    image: "/images/northern-lights.jpg",
  },
  {
    id: 3,
    title: "Desert Dunes",
    location: "Sahara Desert, Morocco",
    image: "/images/sahara.jpg",
  },
  {
    id: 4,
    title: "Venice Canals",
    location: "Venice, Italy",
    image: "/images/venice.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={getPlaceholderImage(1920, 1080, 'The Lone Traveler', '1e3a8a', 'ffffff')}
            alt="Travel photography hero image"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Exploring the World Through My Lens
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            A personal journey capturing beautiful destinations and moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              View Gallery
            </Link>
            <Link
              href="/destinations"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to The Lone Traveler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              I'm a passionate traveler and photographer, documenting my journeys around the world. 
              Through my lens, I aim to capture the essence of each destination - from breathtaking 
              landscapes to vibrant cultural moments.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Destinations
            </h2>
            <Link
              href="/destinations"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View all <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={getImageUrl(destination.image, 800, 600, destination.title)}
                      alt={destination.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {destination.description}
                    </p>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      View destination
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Photos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Photos
            </h2>
            <Link
              href="/gallery"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View gallery <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={getImageUrl(photo.image, 600, 600, photo.title)}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-lg font-bold">{photo.title}</h3>
                    <div className="flex items-center mt-1">
                      <FiMapPin size={14} className="mr-1" />
                      <span className="text-sm">{photo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore more?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover all my travel stories and photography from around the world.
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Browse the Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
