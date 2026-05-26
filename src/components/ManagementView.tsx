/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LEADERS, DIRECTORS, ADMINISTRATION, SCHOOL_INFO } from '../data';
import { 
  Award, 
  Briefcase, 
  MapPin, 
  Mail, 
  Star, 
  CheckCircle, 
  User, 
  Users, 
  Laptop, 
  Database,
  ShieldCheck, 
  Contact, 
  Building 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ManagementView() {
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-sans text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-100 px-3 py-1 rounded-full">
            Our Pillars of Strength
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase mt-3">
            School Governance & Leadership
          </h2>
          <div className="h-1 bg-blue-600 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-650 text-sm md:text-lg font-medium leading-relaxed">
            The visionary minds, educational administrators, and computer experts steering Sun Beam English Medium School under the highest quality guidelines.
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-blue-800 text-xs font-semibold">
            <Building className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Executive Partner with Adarsh Ma. Vi.</span>
          </div>
        </div>

        {/* 1. Primary Executives: Principal & Chairman Messages */}
        <div className="space-y-16 mb-20">
          
          {/* Chairman Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-red-50 to-red-100/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-blue-600 rounded-2xl opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />
                  <img 
                    src={LEADERS.chairman.image} 
                    alt={LEADERS.chairman.name} 
                    className="relative w-full h-[320px] object-cover rounded-2xl border-4 border-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm text-center py-2 text-white font-sans text-xs uppercase font-extrabold tracking-widest rounded-lg border border-white/10">
                    Governing Chairman
                  </span>
                </div>
                <h3 className="text-xl font-sans font-extrabold text-blue-950 text-center">
                  {LEADERS.chairman.name}
                </h3>
                <p className="text-xs uppercase text-red-600 font-bold tracking-widest mt-1 text-center">
                  School Chairman & Founder
                </p>
                <div className="mt-4 flex flex-col items-center text-center space-y-1 text-gray-400">
                  <span className="text-[11px] font-sans font-medium flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{LEADERS.chairman.experience}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center space-x-2 text-red-600">
                  <Star className="w-5 h-5 fill-red-500 text-red-600" />
                  <span className="text-xs font-sans font-extrabold uppercase tracking-widest">
                    Chairman's Message
                  </span>
                </div>
                <h4 className="text-2xl font-sans font-extrabold text-blue-900 leading-tight">
                  “Our Commitment is Modern Infrastructure & Deep Value Integration”
                </h4>
                <div className="h-1 bg-red-600 w-12 rounded-full" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic font-medium pt-2">
                  "{LEADERS.chairman.message}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Leadership Focus:</strong> {LEADERS.chairman.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Principal Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-36 h-36 bg-blue-50 to-blue-100/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 order-2 lg:order-1 space-y-5">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Star className="w-5 h-5 fill-blue-500 text-blue-600" />
                  <span className="text-xs font-sans font-extrabold uppercase tracking-widest">
                    Principal's message
                  </span>
                </div>
                <h4 className="text-2xl font-sans font-extrabold text-blue-900 leading-tight">
                  “Unlocking Creative Curiosity & Scientific Reasoning in Every Child”
                </h4>
                <div className="h-1 bg-blue-600 w-12 rounded-full" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic font-medium pt-2">
                  "{LEADERS.principal.message}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Leadership Focus:</strong> {LEADERS.principal.bio}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-red-600 rounded-2xl opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />
                  <img 
                    src={LEADERS.principal.image} 
                    alt={LEADERS.principal.name} 
                    className="relative w-full h-[320px] object-cover rounded-2xl border-4 border-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm text-center py-2 text-white font-sans text-xs uppercase font-extrabold tracking-widest rounded-lg border border-white/10">
                    Academic Leader
                  </span>
                </div>
                <h3 className="text-xl font-sans font-extrabold text-blue-950 text-center">
                  {LEADERS.principal.name}
                </h3>
                <p className="text-xs uppercase text-red-600 font-bold tracking-widest mt-1 text-center">
                  Principal
                </p>
                <div className="mt-4 flex flex-col items-center text-center space-y-1 text-gray-400">
                  <span className="text-[11px] font-sans font-medium flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{LEADERS.principal.experience}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Director Board Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center space-x-1 text-amber-500 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-blue-950 uppercase">
              The Directorate Board
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Experienced decision makers guiding development policies for Sun Beam English Medium School.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIRECTORS.map((dir, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={dir.image} 
                      alt={dir.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[10px] font-sans font-extrabold tracking-widest text-red-600 uppercase mb-1 block">
                      {dir.role}
                    </span>
                    <h4 className="text-md font-sans font-bold text-blue-950 mb-2 leading-snug">
                      {dir.name}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-normal flex-1">
                      {dir.bio}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Administration Section */}
        <div className="mb-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center space-x-1 text-blue-600 mb-2">
              <Contact className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-blue-950 uppercase">
              Administrative & Operational Support
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Guaranteeing seamless daily coordination, financial transparency, and modern IT environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Split the first four admins into a clean side-by-side or standard responsive box,
                and highlight the computer operator Tilak Kanojiya below as a beautiful technological centerpiece box */}
            {ADMINISTRATION.slice(0, 4).map((admin, idx) => {
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6"
                >
                  <img 
                    src={admin.image} 
                    alt={admin.name} 
                    className="w-32 h-32 object-cover rounded-xl border border-gray-200 shrink-0 self-center sm:self-start"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100 rounded text-[10px] font-sans font-extrabold text-blue-700 uppercase tracking-widest inline-block">
                      {admin.role}
                    </span>
                    <h4 className="text-lg font-sans font-extrabold text-blue-950">
                      {admin.name}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {admin.bio}
                    </p>
                    <div className="pt-2">
                      <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                        Core Responsibilities:
                      </h5>
                      <ul className="space-y-1">
                        {admin.responsibilities.map((res, rIdx) => (
                          <li key={rIdx} className="text-gray-500 text-[11px] font-medium flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlighted Computer Operator: Tilak Kanojiya! */}
          <div className="bg-gradient-to-r from-black to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800/50 max-w-4xl mx-auto overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
    

            <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-red-500 rounded-2xl opacity-75 blur-sm" />
                <img 
                  src={ADMINISTRATION[4].image} 
                  alt={ADMINISTRATION[4].name} 
                  className="relative w-40 h-40 object-cover rounded-2xl border-4 border-slate-900/60 shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-lg shadow-md border border-amber-300">
                  <Laptop className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 outline-none text-slate-950 text-[10px] font-sans font-extrabold tracking-widest px-3 py-1 rounded-full uppercase shadow">
                  <Database className="w-3.5 h-3.5" />
                  <span>IT Director & Computer Operator</span>
                </div>
                
                <h4 className="text-xl sm:text-2xl font-sans font-extrabold tracking-tight">
                  {ADMINISTRATION[4].name}
                </h4>
                
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {ADMINISTRATION[4].bio}
                </p>

                <div className="pt-3 border-t border-white/10">
                  <h5 className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mb-2">
                    Managed Systems & ICT Framework:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    {ADMINISTRATION[4].responsibilities.map((res, rIdx) => (
                      <div key={rIdx} className="text-blue-200 text-xs font-medium flex items-center space-x-2 bg-white/5 px-2.5 py-1.5 rounded border border-white/5">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="leading-tight">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
