/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveView } from './types';
import { LEADERS, SCHOOL_INFO } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutView from './components/AboutView';
import ManagementView from './components/ManagementView';
import GalleryView from './components/GalleryView';
import AppointmentView from './components/AppointmentView';
import EnrollmentView from './components/EnrollmentView';
import ContactView from './components/ContactView';
import NoticeBoard from './components/NoticeBoard';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  CheckCircle,
  GraduationCap,
  Megaphone,
  BookOpen,
  CalendarDays,
  UserCheck,
  Compass,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<ActiveView>('home');

  const renderViewContent = () => {
    switch (view) {
      case 'about':
        return <AboutView />;
      case 'leadership':
        return <ManagementView />;
      case 'gallery':
        return <GalleryView />;
      case 'appointment':
        return <AppointmentView />;
      case 'enroll':
        return <EnrollmentView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminPortal />;
      default:
        return (
          <div className="space-y-16">
            
            {/* Home Welcome & Special Executive Affiliation Banner */}
            <section className="py-14 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-1.5 bg-red-50 border border-red-100 px-3.5 py-1 rounded-full text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Executive Partner with Adarsh Ma. Vi.</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 leading-tight uppercase max-w-4xl mx-auto">
                  Welcome to Sun Beam English Medium School
                </h2>
                <div className="h-1 bg-gradient-to-red from-blue-600 via-red-650 to-amber-400 w-32 mx-auto my-5 rounded-full" />
                
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-4xl mx-auto font-medium">
                  Seated proudly in Nepalgunj-01, Banke, Sun Beam English Medium School represents a state-of-the-art educational environment. Grounded on our strong partnership with <strong className="text-red-750">Adarsh Ma. Vi.</strong>, we deliver robust computer laboratories, comprehensive extracurricular pathways, and holistic values-based learning programs suitable for future leaders.
                </p>

                {/* Grid Quick Shortcuts links cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
                  <div 
                    onClick={() => { setView('enroll'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-6 bg-slate-50 rounded-2xl border border-gray-150 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-500/20 transition-all text-left space-y-3 group"
                  >
                    <div className="w-10 h-10 bg-blue-105 rounded-xl flex items-center justify-center text-blue-700 font-extrabold group-hover:scale-105 transition-transform">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-sans font-bold text-blue-950 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                        <span>Admissions Open</span>
                        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        Register for the new 2083 BS curriculum sessions online.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setView('appointment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-6 bg-slate-50 rounded-2xl border border-gray-150 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-500/20 transition-all text-left space-y-3 group"
                  >
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-700 font-extrabold group-hover:scale-105 transition-transform">
                      <CalendarDays className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-sans font-bold text-blue-950 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                        <span>Book Appointment</span>
                        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        Schedule a dedicated school visit with the principal or coordinator.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setView('leadership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-6 bg-slate-50 rounded-2xl border border-gray-150 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-500/20 transition-all text-left space-y-3 group"
                  >
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 font-extrabold group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-sans font-bold text-blue-950 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                        <span>Meet Our Pillars</span>
                        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        Tour the governing executive details, directors, and operator staff.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Home Dual Profile Cards: Mini Principal & Chairman Messages Panel */}
            <section className="py-14 bg-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header title */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-blue-700 font-sans text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                    Executive Words
                  </span>
                  <h3 className="text-2xl md:text-3.5xl font-sans font-extrabold text-blue-950 uppercase mt-3">
                    Messages from Leadership
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
                    Inspiring dedication to scholastic growth, digital transformation, and child welfare.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  
                  {/* Chairman Message Card */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={LEADERS.chairman.image} 
                          alt={LEADERS.chairman.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-red-500 shadow"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <strong className="block text-md font-sans text-blue-950 font-bold">{LEADERS.chairman.name}</strong>
                          <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Governing Chairman</span>
                        </div>
                      </div>
                      <blockquote className="text-gray-600 text-xs sm:text-sm leading-relaxed italic pt-2">
                        "{LEADERS.chairman.message?.substring(0, 180)}..."
                      </blockquote>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 mt-6 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-medium">Founder Partner</span>
                      <button 
                        onClick={() => { setView('leadership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-xs font-extrabold text-blue-600 hover:text-blue-750 inline-flex items-center gap-1 group"
                      >
                        <span>Full Message</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Principal Message Card */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={LEADERS.principal.image} 
                          alt={LEADERS.principal.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <strong className="block text-md font-sans text-blue-950 font-bold">{LEADERS.principal.name}</strong>
                          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Academic Principal</span>
                        </div>
                      </div>
                      <blockquote className="text-gray-600 text-xs sm:text-sm leading-relaxed italic pt-2">
                        "{LEADERS.principal.message?.substring(0, 180)}..."
                      </blockquote>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 mt-6 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-medium">20+ Years Experience</span>
                      <button 
                        onClick={() => { setView('leadership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-xs font-extrabold text-blue-600 hover:text-blue-750 inline-flex items-center gap-1 group"
                      >
                        <span>Full Message</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* Homepage Notice Board dashboard */}
            <section className="bg-slate-50 border-t border-gray-150">
              <NoticeBoard />
            </section>

          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Header sticky Navigation element */}
      <Navbar currentView={view} setView={setView} />

      {/* Hero Banner display (renders specifically on Home layout block) */}
      <div className="mt-[64px] md:mt-[100px]">
        {view === 'home' && <Hero setView={setView} />}
      </div>

      {/* Pages Content viewport rendering with Motion Layout Fades */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderViewContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Block */}
      <Footer setView={setView} />

    </div>
  );
}
