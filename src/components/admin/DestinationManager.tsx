'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave } from 'react-icons/fi';
import { getImageUrl } from '@/lib/image-utils';

// Define the Destination type
interface Destination {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  date: string;
  continent: string;
  location: string;
  slug: string;
}

// Sample initial destinations data
const initialDestinations = [
  {
    id: 1,
    title: 'Santorini, Greece',
    description: 'Iconic white-washed buildings perched on cliffs overlooking the Aegean Sea.',
    fullDescription: 'Santorini is one of the most picturesque islands in Greece, known for its stunning sunsets, white-washed buildings with blue domes, and dramatic views of the caldera. The island was formed from a volcanic eruption and offers unique black and red sand beaches.',
    image: getImageUrl('/images/santorini.jpg', 800, 600, 'Santorini, Greece'),
    date: 'June 2023',
    continent: 'Europe',
    location: 'Santorini, Greece',
    slug: 'santorini-greece',
  },
  {
    id: 2,
    title: 'Kyoto, Japan',
    description: 'Ancient temples, traditional gardens, and geisha districts in Japan\'s cultural heart.',
    fullDescription: 'Kyoto served as Japan\'s capital for over a thousand years and is home to numerous temples, shrines, and traditional gardens. The city is known for its preservation of Japanese culture, including geisha districts, tea ceremonies, and traditional crafts.',
    image: getImageUrl('/images/kyoto.jpg', 800, 600, 'Kyoto, Japan'),
    date: 'April 2023',
    continent: 'Asia',
    location: 'Kyoto, Japan',
    slug: 'kyoto-japan',
  },
  {
    id: 3,
    title: 'Machu Picchu, Peru',
    description: 'The lost city of the Incas, nestled high in the Andes mountains.',
    fullDescription: 'Machu Picchu is an ancient Incan citadel set high in the Andes Mountains of Peru. Built in the 15th century and later abandoned, it\'s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments, and panoramic views.',
    image: getImageUrl('/images/machu-picchu.jpg', 800, 600, 'Machu Picchu, Peru'),
    date: 'September 2022',
    continent: 'South America',
    location: 'Cusco Region, Peru',
    slug: 'machu-picchu-peru',
  },
];

const DestinationManager = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState<Omit<Destination, 'id'>>({
    title: '',
    description: '',
    fullDescription: '',
    image: '',
    date: '',
    continent: '',
    location: '',
    slug: '',
  });

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setDestinations(initialDestinations);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentDestination(null);
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      image: '',
      date: '',
      continent: '',
      location: '',
      slug: '',
    });
  };

  const handleEdit = (destination: Destination) => {
    setIsEditing(true);
    setCurrentDestination(destination);
    setFormData({
      title: destination.title,
      description: destination.description,
      fullDescription: destination.fullDescription || '',
      image: destination.image,
      date: destination.date,
      continent: destination.continent,
      location: destination.location,
      slug: destination.slug,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter((dest) => dest.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a slug if not provided
    let slug = formData.slug;
    if (!slug) {
      slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    
    // Create image URL if it's just a path
    let image = formData.image;
    if (image && !image.includes('?')) {
      image = getImageUrl(image, 800, 600, formData.title);
    }

    if (currentDestination) {
      // Update existing destination
      setDestinations(
        destinations.map((dest) =>
          dest.id === currentDestination.id
            ? { ...formData, id: currentDestination.id, slug, image }
            : dest
        )
      );
    } else {
      // Add new destination
      const newId = Math.max(0, ...destinations.map((d) => d.id)) + 1;
      setDestinations([...destinations, { ...formData, id: newId, slug, image }]);
    }

    setIsEditing(false);
    setCurrentDestination(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentDestination(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Destinations</h2>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            Add Destination
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="continent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Continent
              </label>
              <select
                name="continent"
                id="continent"
                required
                value={formData.continent}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a continent</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="text"
                name="date"
                id="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                placeholder="e.g. June 2023"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image Path
              </label>
              <input
                type="text"
                name="image"
                id="image"
                required
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/images/your-image.jpg"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Slug (URL path)
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Will be generated if left empty"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Short Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={2}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              id="fullDescription"
              rows={4}
              value={formData.fullDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiX className="mr-2 -ml-1 h-5 w-5" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiSave className="mr-2 -ml-1 h-5 w-5" />
              {currentDestination ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Continent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {destinations.map((destination) => (
                <tr key={destination.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={destination.image} alt={destination.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{destination.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{destination.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{destination.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{destination.continent}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{destination.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(destination)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(destination.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DestinationManager; 