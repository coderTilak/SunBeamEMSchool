/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveView } from '../types';
import { SCHOOL_INFO } from '../data';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: ActiveView;
  setView: (view: ActiveView) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'admission' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' as ActiveView },
    { 
      label: 'About US', 
      view: 'about' as ActiveView,
      dropdown: 'about',
      subItems: [
        { label: 'School History', view: 'about' as ActiveView },
        { label: 'Our Mission & Vision', view: 'about' as ActiveView },
        { label: 'Leadership & Board', view: 'leadership' as ActiveView }
      ]
    },
    { 
      label: 'Admissions', 
      view: 'enroll' as ActiveView,
      dropdown: 'admission',
      subItems: [
        { label: 'Enroll Now', view: 'enroll' as ActiveView },
        { label: 'Book Appointment', view: 'appointment' as ActiveView }
      ]
    },
    { label: 'Media Gallery', view: 'gallery' as ActiveView },
    { label: 'Contact Us', view: 'contact' as ActiveView },
    { label: 'Admin Portal', view: 'admin' as ActiveView }
  ];

  const handleNavClick = (view: ActiveView) => {
    setView(view);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top Bar (Hidden on Mobile) */}
      <div className="bg-linear-to-r from-blue-900 via-blue-800 to-red-700 text-white text-xs py-2 px-4 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-300" />
              <span>{SCHOOL_INFO.location}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span>{SCHOOL_INFO.phones[0]}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider animate-pulse uppercase">
              {SCHOOL_INFO.affiliated}
            </span>
            <span className="text-gray-200">Hours: {SCHOOL_INFO.officeHours}</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg border-b border-gray-100 py-3' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-200/50 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand/Logo Section */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            id="nav-logo-btn"
          >
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white shadow-md relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 relative z-10" />
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-sans font-extrabold tracking-tight text-blue-900 leading-tight">
                SUN BEAM
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold">
                English Medium School
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, idx) => {
              if (item.subItems) {
                return (
                  <div 
                    key={idx} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.dropdown as any)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`px-4 py-2 rounded-md font-sans text-sm font-semibold tracking-wide flex items-center space-x-1.5 transition-all duration-200 ${
                      currentView === item.view 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}>
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.dropdown ? 'rotate-180 text-blue-600' : 'text-gray-400'
                      }`} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.dropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-52 bg-white rounded-lg shadow-xl py-2 border border-gray-100 ring-4 ring-black/5"
                        >
                          {item.subItems.map((sub, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleNavClick(sub.view)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-2 rounded-md font-sans text-sm font-semibold tracking-wide transition-all duration-200 ${
                    currentView === item.view 
                      ? 'text-white bg-blue-600 shadow-sm shadow-blue-300' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={() => handleNavClick('appointment')}
              className="px-4 py-2 border border-blue-600 hover:bg-blue-50 text-blue-700 rounded-md font-sans text-xs font-bold transition-all uppercase tracking-wider flex items-center space-x-1"
              id="cta-nav-appointment"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointment</span>
            </button>
            <button 
              onClick={() => handleNavClick('enroll')}
              className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-md font-sans text-xs font-bold hover:shadow-md hover:from-red-700 hover:to-red-800 transition-all uppercase tracking-wider flex items-center space-x-1 shadow-sm"
              id="cta-nav-enroll"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enroll Now</span>
            </button>
          </div>

          {/* Mobile Hamburguer Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={() => handleNavClick('appointment')}
              className="p-2 text-blue-900 bg-blue-50 rounded-md hover:bg-blue-100"
              title="Book Appointment"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
              id="mobile-menu-toggle-btn"
            >
              {isOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-blue-900" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, idx) => {
                if (item.subItems) {
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs uppercase font-extrabold tracking-wider text-gray-400 px-3 pt-2">
                        {item.label}
                      </div>
                      {item.subItems.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleNavClick(sub.view)}
                          className={`w-full text-left px-5 py-2 rounded-md font-sans text-sm font-medium transition-colors ${
                            currentView === sub.view 
                              ? 'text-blue-600 bg-blue-50/50' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full text-left px-3 py-3 rounded-md font-sans text-sm font-semibold transition-colors ${
                      currentView === item.view 
                        ? 'text-white bg-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <button 
                  onClick={() => handleNavClick('enroll')}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-center font-sans text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
