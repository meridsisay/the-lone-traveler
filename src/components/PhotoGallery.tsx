'use client';

import { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { FiMapPin, FiCalendar, FiCamera } from 'react-icons/fi';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

export interface Photo {
  id: number;
  title: string;
  description?: string;
  location: string;
  date: string;
  camera?: string;
  image: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Gallery>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {photos.map((photo) => (
          <div key={photo.id} className="mb-4">
            <Item
              original={photo.image}
              thumbnail={photo.image}
              width={photo.width}
              height={photo.height}
              caption={`${photo.title} - ${photo.location}`}
            >
              {({ ref, open }) => (
                <div 
                  className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  ref={ref as any}
                  onClick={open}
                >
                  <div className="relative aspect-auto">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-lg font-bold">{photo.title}</h3>
                      <div className="flex items-center mt-1">
                        <FiMapPin size={14} className="mr-1" />
                        <span className="text-sm">{photo.location}</span>
                      </div>
                      {photo.date && (
                        <div className="flex items-center mt-1">
                          <FiCalendar size={14} className="mr-1" />
                          <span className="text-sm">{photo.date}</span>
                        </div>
                      )}
                      {photo.camera && (
                        <div className="flex items-center mt-1">
                          <FiCamera size={14} className="mr-1" />
                          <span className="text-sm">{photo.camera}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Item>
          </div>
        ))}
      </Masonry>
    </Gallery>
  );
};

export default PhotoGallery; 