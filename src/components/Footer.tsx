/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveView } from '../types';
import { SCHOOL_INFO } from '../data';
import { 
  ArrowUp, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  Heart,
  Facebook,
  Youtube,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setView: (view: ActiveView) => void;
}

export default function Footer({ setView }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (view: ActiveView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t-8 border-red-700 text-white pt-16 pb-8 relative">
      
      {/* Wave shape line separators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-10">
        
        {/* Brand & Motto column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-blue-900 shadow">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <div>
              <h4 className="text-md sm:text-lg font-sans font-extrabold tracking-tight">
                SUN BEAM
              </h4>
              <p className="text-[9px] uppercase tracking-widest text-red-500 font-bold">
                School Nepalgunj
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
            {SCHOOL_INFO.tagline}. Blending elite global educational materials with rich ethical standards. Located in Nepalgunj-01, Banke.
          </p>
          <div className="text-[11px] font-sans font-semibold text-amber-400 uppercase tracking-widest bg-white/5 border border-white/5 px-3 py-1.5 rounded inline-block">
            {SCHOOL_INFO.affiliated}
          </div>
        </div>

        {/* Quick links columns */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="text-xs uppercase font-sans font-extrabold tracking-widest text-[#fc5c04]">
            Quick Links
          </h5>
          <ul className="space-y-2 text-xs text-gray-400 font-medium">
            <li>
              <button onClick={() => handleLinkClick('home')} className="hover:text-amber-400 transition-colors">
                Home Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('about')} className="hover:text-amber-400 transition-colors">
                School History
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('leadership')} className="hover:text-amber-400 transition-colors">
                Leadership Directory
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('gallery')} className="hover:text-amber-400 transition-colors">
                Media Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-amber-400 transition-colors">
                Contact Address
              </button>
            </li>
          </ul>
        </div>

        {/* Admissions links column */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="text-xs uppercase font-sans font-extrabold tracking-widest text-blue-400">
            Admissions
          </h5>
          <ul className="space-y-2 text-xs text-gray-400 font-medium">
            <li>
              <button onClick={() => handleLinkClick('enroll')} className="hover:text-amber-400 transition-colors">
                Enroll Now 2083
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('appointment')} className="hover:text-amber-400 transition-colors">
                Book Visit Slot
              </button>
            </li>
            <li>
              <a href="#faq" onClick={() => handleLinkClick('home')} className="hover:text-amber-400 transition-colors">
                Pre-School Guidelines
              </a>
            </li>
            <li>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-amber-400 transition-colors">
                School Bus Routes
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info metadata column */}
        <div className="md:col-span-4 space-y-3">
          <h5 className="text-xs uppercase font-sans font-extrabold tracking-widest text-emerald-400">
            Contact Channels
          </h5>
          <div className="space-y-3.5 text-xs text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{SCHOOL_INFO.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-blue-450 shrink-0 mt-0.5" />
              <div className="space-y-1 font-sans">
                {SCHOOL_INFO.phones.slice(0, 2).map((ph, idx) => (
                  <span className="block font-bold text-gray-300" key={idx}>{ph}</span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 font-sans">
              <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                {SCHOOL_INFO.emails.map((email, idx) => (
                  <span className="block font-semibold hover:text-white" key={idx}>{email}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-550 gap-4">
        
        {/* Copyrights and values declaration */}
        <div className="text-center sm:text-left text-gray-450 space-y-0.5 font-sans">
          <p>© {new Date().getFullYear()} Sun Beam English Medium School, Banke. All Rights Reserved.</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Project Curation by IT operators & Adarsh Ma. Vi.
          </p>
        </div>

        {/* Action button channels */}
        <div className="flex items-center space-x-3.5">
          <button 
            onClick={handleScrollToTop} 
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/5 active:scale-[0.9]"
            title="Scroll back to Top"
            id="back-to-top-footer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Persistent Sticky Floating WhatsApp Chat Widget (Bottom Right corner) */}
      <a 
        href={SCHOOL_INFO.socials.whatsapp} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-3.5 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-all transform hover:scale-110 active:scale-[0.95]"
        title="Chat Assistance"
        id="whatsapp-floater-btn"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        {/* Subtle badge */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </a>

    </footer>
  );
}
