/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VALUES, WHY_CHOOSE_US, SCHOOL_INFO } from '../data';
import { 
  History, 
  Target, 
  Gem, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Award, 
  Compass, 
  Backpack, 
  Map, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const valuesData = [
    {
      title: "Academic Integrity",
      description: "Nurturing honest evaluation pathways, deep cognitive rigor, and lifelong intellectual curiosity.",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Inclusive Innovation",
      description: "Ensuring individual learning assistance across pre-schools and higher blocks using advanced equipment.",
      icon: Cpu,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Socio-Cultural Pride",
      description: "Celebrating Tharu, Nepali, and South-Asian heritage alongside global digital skill foundations.",
      icon: Compass,
      color: "from-red-500 to-red-600"
    },
    {
      title: "Collaborative Leadership",
      description: "Active leadership roles for students through class coordination committees, environmental squads, and sports boards.",
      icon: Activity,
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      {/* Background patterns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Since 2054 BS / 1998 AD</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase">
            About Our School
          </h2>
          <div className="h-1 bg-red-600 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-lg font-medium leading-relaxed">
            Discover the rich historical legacy of Sun Beam English Medium School, our commitment to pioneering education in Nepalgunj, Banke, and our partnership with Adarsh Ma. Vi.
          </p>
        </div>

        {/* School History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-red-600">
              <History className="w-6 h-6" />
              <h3 className="text-xl md:text-2xl font-sans font-extrabold uppercase tracking-wide">
                Our Golden History
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Founded in <strong className="text-blue-950">2059 BS (2002 AD)</strong> inside Nepalgunj-01, Banke, Nepal, Sun Beam English Medium School bloomed as a vital spark for families who sought first-grade english-medium academic assets for their children. Over the past quarter of a century, the institution has emerged as an educational powerhouse, known for its focus on values, scientific logic, and character development.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Our growth narrative is anchored by our prestigious <strong className="text-red-700 font-bold">Executive Partnership with Adarsh Ma. Vi.</strong>. Together, we blend public-private competencies, ensuring that our students enjoy premium training classrooms, state-of-the-art computers, and advanced sports layouts that parallel modern academic standards.
            </p>
            <div className="bg-blue-50/50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <span className="block italic text-blue-900 text-xs sm:text-sm font-semibold">
                "Today, we stand tall as one of Banke's premier institutions, steering 1100+ students towards global analytical skills, cultural integrity, and innovative thinking."
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-red from-blue-600 to-red-600 rounded-2xl opacity-35 blur-md" />
            <img 
              src="/schoolphoto2.jpg" 
              alt="Sun Beam Campus History Banner" 
              className="relative rounded-2xl border-4 border-white shadow-lg object-cover w-full h-[320px] sm:h-[400px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Mission, Vision, and Educational Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {VALUES.map((val, idx) => {
            const isBlue = idx === 0;
            const isRed = idx === 1;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-8 border-t-8 shadow-md relative group hover:shadow-xl transition-all ${
                  isBlue ? 'border-blue-600' : isRed ? 'border-red-600' : 'border-amber-400'
                }`}
              >
                <div className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 group-hover:bg-slate-100 transition-colors">
                  {idx === 0 ? <Target className="w-6 h-6 text-blue-600" /> : idx === 1 ? <Gem className="w-6 h-6 text-red-600" /> : <BookOpen className="w-6 h-6 text-amber-500" />}
                </div>
                <h4 className="text-lg md:text-xl font-sans font-extrabold text-blue-950 uppercase mb-4 pt-4">
                  {val.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us & Key Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-blue-900 uppercase">
              Why Parents Choose Sun Beam?
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-2">
              Our structural advantages that pave the way for student innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 flex gap-5 items-start hover:shadow-md transition-all"
                >
                  <div className="p-3.5 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-md sm:text-lg font-sans font-bold text-blue-950 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values in Practice Section */}
        <div className="mb-10 bg-gradient-to-b from-blue-950 to-blue-900 border border-blue-800 text-white rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 font-sans text-xs font-bold uppercase tracking-wider">
              Educational Framework
            </span>
            <h3 className="text-2xl md:text-4xl font-sans font-extrabold uppercase mt-1">
              Core Principles in Action
            </h3>
            <p className="text-blue-200 text-xs sm:text-sm mt-3">
              We translate our high educational standards into continuous positive cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 text-white shadow`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-sans font-bold uppercase text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-blue-100 text-[11px] sm:text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
