'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave } from 'react-icons/fi';
import { getImageUrl } from '@/lib/image-utils';
import { Photo } from '@/components/PhotoGallery';

// Sample initial photos data
const initialPhotos: Photo[] = [
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
    image: getImageUrl('/images/northern-lights.jpg', 1200, 800, 'Northern Lights in Norway'),
    width: 1200,
    height: 800,
  },
  {
    id: 3,
    title: 'Machu Picchu Sunrise',
    description: 'First light hitting the ancient Incan citadel of Machu Picchu.',
    location: 'Cusco Region, Peru',
    date: 'September 2022',
    camera: 'Nikon Z7',
    image: getImageUrl('/images/machu-picchu-sunrise.jpg', 1200, 800, 'Sunrise at Machu Picchu'),
    width: 1200,
    height: 800,
  },
];

const PhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [formData, setFormData] = useState<Omit<Photo, 'id'>>({
    title: '',
    description: '',
    location: '',
    date: '',
    camera: '',
    image: '',
    width: 1200,
    height: 800,
  });

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setPhotos(initialPhotos);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPhoto(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      camera: '',
      image: '',
      width: 1200,
      height: 800,
    });
  };

  const handleEdit = (photo: Photo) => {
    setIsEditing(true);
    setCurrentPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || '',
      location: photo.location,
      date: photo.date,
      camera: photo.camera || '',
      image: photo.image,
      width: photo.width,
      height: photo.height,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter((photo) => photo.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create image URL if it's just a path
    let image = formData.image;
    if (image && !image.includes('?')) {
      image = getImageUrl(image, formData.width, formData.height, formData.title);
    }

    if (currentPhoto) {
      // Update existing photo
      setPhotos(
        photos.map((photo) =>
          photo.id === currentPhoto.id
            ? { ...formData, id: currentPhoto.id, image }
            : photo
        )
      );
    } else {
      // Add new photo
      const newId = Math.max(0, ...photos.map((p) => p.id)) + 1;
      setPhotos([...photos, { ...formData, id: newId, image }]);
    }

    setIsEditing(false);
    setCurrentPhoto(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPhoto(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Photos</h2>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            Add Photo
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
                placeholder="e.g. July 2023"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="camera" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Camera
              </label>
              <input
                type="text"
                name="camera"
                id="camera"
                value={formData.camera}
                onChange={handleInputChange}
                placeholder="e.g. Sony A7III"
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Width (px)
                </label>
                <input
                  type="number"
                  name="width"
                  id="width"
                  required
                  min="100"
                  value={formData.width}
                  onChange={handleNumberChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Height (px)
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  required
                  min="100"
                  value={formData.height}
                  onChange={handleNumberChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
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
              {currentPhoto ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Camera
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {photos.map((photo) => (
                <tr key={photo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded object-cover" src={photo.image} alt={photo.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{photo.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{photo.width}x{photo.height}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{photo.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{photo.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{photo.camera || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(photo)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(photo.id)}
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

export default PhotoManager; 