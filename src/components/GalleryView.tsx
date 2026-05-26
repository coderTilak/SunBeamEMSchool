/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { GALLERY_PHOTOS } from '../data';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { GalleryPhoto } from '../types';
import { 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Grid, 
  Eye,
  Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CategoryFilter = 'All' | 'School Events' | 'Sports' | 'Cultural Programs' | 'Classroom Activities' | 'Annual Functions' | 'Tours and Excursions';

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [remoteLoaded, setRemoteLoaded] = useState(false);

  const categories: CategoryFilter[] = [
    'All',
    'School Events',
    'Sports',
    'Cultural Programs',
    'Classroom Activities',
    'Annual Functions',
    'Tours and Excursions'
  ];

  useEffect(() => {
    const photosQuery = query(collection(db, 'galleryPhotos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(photosQuery, (snapshot) => {
      setRemoteLoaded(true);
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GalleryPhoto, 'id'>),
      }));
      setPhotos(fetched);
    }, () => {
      setRemoteLoaded(true);
    });

    return unsubscribe;
  }, []);

  const displayedPhotos = remoteLoaded ? photos : GALLERY_PHOTOS;
  const filteredPhotos = activeCategory === 'All'
    ? displayedPhotos
    : displayedPhotos.filter(photo => photo.category === activeCategory);

  const openLightbox = (photoId: string) => {
    const index = displayedPhotos.findIndex(p => p.id === photoId);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null && displayedPhotos.length > 0) {
      setLightboxIndex((prev) => (prev! + 1) % displayedPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null && displayedPhotos.length > 0) {
      setLightboxIndex((prev) => (prev! - 1 + displayedPhotos.length) % displayedPhotos.length);
    }
  };

  const currentPhoto = lightboxIndex !== null ? displayedPhotos[lightboxIndex] : null;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-sans text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Pictorial Highlights
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase mt-3">
            Media & Photo Gallery
          </h2>
          <div className="h-1 bg-red-600 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-650 text-xs sm:text-base font-medium leading-relaxed">
            Take a journey through the lively classrooms, major athletic achievements, scientific explorations, and traditional cultural festivals that color daily life at Sun Beam.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-gray-150">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans text-xs md:text-sm font-bold tracking-wide transition-all shadow-sm flex items-center space-x-1.5 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' && <Grid className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid listing */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => openLightbox(photo.id)}
              >
                {/* Image panel */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle red/blue gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-blue-950/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Category Pill Tag */}
                  <span className="absolute top-3.5 left-3.5 bg-red-650/95 backdrop-blur-sm text-white text-[9px] font-sans font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider border border-white/10 shadow-sm">
                    {photo.category}
                  </span>
                </div>

                {/* Sub Text */}
                <div className="p-4 space-y-1.5 bg-white">
                  <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-sans">
                    <Calendar className="w-3 h-3" />
                    <span>{photo.date}</span>
                  </div>
                  <h4 className="text-sm font-sans font-bold text-blue-950 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md mx-auto">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-md font-sans font-bold text-blue-900">
              No Photos Found
            </h4>
            <p className="text-gray-500 text-xs mt-1">
              There are currently no assets declared under this sub-category.
            </p>
          </div>
        )}

        {/* Interactive Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && currentPhoto && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col justify-between p-4 md:p-10 select-none"
            >
              {/* Header inside Modal */}
              <div className="flex justify-between items-center text-white mb-4">
                <div>
                  <span className="text-amber-400 text-xs font-sans font-extrabold uppercase tracking-widest block">
                    {currentPhoto.category}
                  </span>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                    Image {lightboxIndex + 1} of {displayedPhotos.length}
                  </p>
                </div>
                <button 
                  onClick={closeLightbox}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors relative"
                  title="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Slider Layer */}
              <div className="flex-1 flex items-center justify-between relative max-h-[70vh]">
                <button 
                  onClick={prevLightbox}
                  className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors z-20"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="relative inline-block max-w-[85%] max-h-full">
                  <motion.img 
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    src={currentPhoto.url} 
                    alt={currentPhoto.title} 
                    className="max-w-full max-h-[65vh] object-contain rounded-lg border border-white/10 mx-auto shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <button 
                  onClick={nextLightbox}
                  className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors z-20"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Details panel */}
              <div className="max-w-4xl mx-auto text-center text-white mt-4 bg-slate-900/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex justify-center space-x-4 text-xs font-mono text-gray-400 mb-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Captured: {currentPhoto.date}</span>
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-sans font-bold text-amber-300">
                  {currentPhoto.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl mx-auto">
                  {currentPhoto.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
