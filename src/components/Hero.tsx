/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HERO_SLIDES, SCHOOL_INFO } from '../data';
import { ActiveView } from '../types';
import { ChevronLeft, ChevronRight, Play, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  setView: (view: ActiveView) => void;
}

export default function Hero({ setView }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative h-[550px] md:h-[680px] w-full bg-slate-900 overflow-hidden">
      
      {/* Slide Carousels */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={HERO_SLIDES[current].image}
              alt={HERO_SLIDES[current].title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Deep Dark Overlay with Red/Blue Color undertone */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-slate-900/60 to-slate-900/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10 select-none">
          
          {/* Tagline / School Name Indicator Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-blue-600/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-400/40 mb-6 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider font-sans">
              Admission Open for Session 2083
            </span>
          </motion.div>

          {/* School Primary Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-6xl font-sans font-extrabold tracking-tight leading-tight uppercase"
          >
            <span className="block text-red-500 font-sans tracking-wide glow-red filter drop-shadow-[0_2px_10px_rgba(239,68,68,0.3)]">
              Sun Beam
            </span>
            <span className="block text-white font-sans mt-1">
              English Medium School
            </span>
          </motion.h1>

          {/* Subtitle / Dynamic Slide motto & descriptions */}
          <div className="h-28 md:h-24 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-amber-400 text-sm md:text-base font-bold tracking-wide uppercase font-sans mb-2">
                  {HERO_SLIDES[current].subtitle}
                </p>
                <p className="text-gray-200 text-xs sm:text-sm md:text-lg leading-relaxed font-medium">
                  {HERO_SLIDES[current].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action CTAs Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => setView('enroll')}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 hover:shadow-red-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="hero-enroll-now-btn"
            >
              Enroll Now (Session 2083)
            </button>
            <button
              onClick={() => setView('appointment')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-100 text-blue-950 rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              id="hero-book-appointment-btn"
            >
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setView('contact')}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-900/80 hover:bg-blue-900 text-white rounded-lg font-sans font-bold text-sm uppercase tracking-wider shadow-md border border-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="hero-contact-us-btn"
            >
              Contact Us
            </button>
          </motion.div>

        </div>
      </div>

      {/* Manual Sliding Trigger Selectors */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Previous slide"
        id="hero-slider-prev-btn"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Next slide"
        id="hero-slider-next-btn"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Pills */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
