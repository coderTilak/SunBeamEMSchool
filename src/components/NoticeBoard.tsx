/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { NOTICES, EVENTS, STATISTICS, FAQS, TESTIMONIALS, SCHOOL_INFO } from '../data';
import { NoticeItem, SchoolEvent } from '../types';
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Megaphone, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  Mail, 
  Star,
  Sparkles,
  Users,
  Award,
  CalendarCheck,
  Trophy,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NoticeBoard() {
  const [activeNoticeCategory, setActiveNoticeCategory] = useState<'All' | 'Academic' | 'Admission' | 'Event' | 'Holiday'>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  // Filtering notices
  const filteredNotices = activeNoticeCategory === 'All' 
    ? NOTICES 
    : NOTICES.filter(n => n.category === activeNoticeCategory);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-blue-600" />;
      case 'Award': return <Award className="w-6 h-6 text-red-650" />;
      case 'Calendar': return <CalendarCheck className="w-6 h-6 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-emerald-500" />;
      default: return <Trophy className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-20 py-10 bg-slate-50">

      {/* 1. Statistics Numbers Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y-2 md:divide-y-0 md:divide-x divide-gray-100 text-center">
            {STATISTICS.map((stat, idx) => (
              <div key={idx} className="space-y-2 pt-6 md:pt-0 first:pt-0">
                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-gray-100 mt-2 md:mt-0 shadow-sm">
                  {getStatIcon(stat.icon)}
                </div>
                <h4 className="text-2xl sm:text-4xl font-sans font-extrabold tracking-tight text-blue-950">
                  {stat.value}
                </h4>
                <p className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Notice Board & Announcements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bulletins lists panel */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-gray-150 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-6 gap-4">
              <div className="flex items-center space-x-3 text-red-600">
                <Bell className="w-6 h-6 animate-swing text-red-650" />
                <h3 className="text-md sm:text-xl font-sans font-extrabold uppercase tracking-wide text-blue-950">
                  Notice Board & Announcements
                </h3>
              </div>
              
              {/* Filter pills */}
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'Academic', 'Admission', 'Holiday'] as const).map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveNoticeCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeNoticeCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List panel */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredNotices.map((notice) => {
                const isImportant = notice.isImportant;
                return (
                  <button
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-500/30 hover:bg-blue-50/20 transition-all flex gap-4 items-start relative group"
                  >
                    {isImportant && (
                      <span className="absolute top-0 right-4 h-1.5 w-12 bg-red-600 rounded-b-full shadow" />
                    )}
                    <div className="p-3 bg-red-50 text-red-605 rounded-lg shrink-0 group-hover:bg-red-100 transition-colors">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-gray-450 font-sans font-medium">
                          {notice.date}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase">
                          {notice.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-sans font-bold text-blue-950 group-hover:text-blue-700 transition-colors">
                        {notice.title}
                      </h4>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-normal">
                        {notice.content}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Upcoming Events section */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-md">
            <h3 className="text-md sm:text-lg font-sans font-extrabold uppercase border-b pb-4 mb-6 text-blue-950 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Upcoming School Events</span>
            </h3>

            <div className="space-y-6">
              {EVENTS.map((event) => {
                // Split date into day and month mockup
                const [month, day, year] = event.date.split(' ');
                return (
                  <div key={event.id} className="flex gap-4 items-start border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                    <div className="w-12 h-14 bg-gradient-to-b from-blue-900 to-blue-950 text-white rounded-lg flex flex-col justify-center items-center font-sans tracking-tight shrink-0 shadow">
                      <span className="text-sm font-extrabold leading-none">{day.replace(',', '')}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-200 mt-1">{month}</span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <h4 className="text-xs sm:text-sm font-sans font-extrabold text-blue-950 hover:text-blue-600 transition-colors">
                        {event.title}
                      </h4>
                      <div className="space-y-0.5 text-[10px] sm:text-xs text-gray-500 font-medium font-sans">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-red-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed pt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Parent Reviews Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 font-sans text-xs font-bold uppercase tracking-widest pl-2">
              Feedback Loop
            </span>
            <h3 className="text-2xl md:text-4xl font-sans font-extrabold uppercase mt-1">
              Testimonials from Banke District
            </h3>
            <p className="text-blue-200 text-xs sm:text-sm mt-2 leading-relaxed">
              Read how our dedicated teachers and operators positively influence the mental model of student cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed italic">
                    "{test.content}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10 mt-6 flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-amber-300 font-sans font-extrabold uppercase tracking-widest text-sm border border-white/10">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <strong className="block text-sm text-white font-sans">{test.author}</strong>
                    <span className="text-[11px] text-gray-400 block font-medium">{test.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 5. FAO Accordion Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 sm:p-12 rounded-3xl border border-gray-150 shadow-lg">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-blue-950 uppercase">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            General queries resolved regarding academic enrollment, partnerships, and operations.
          </p>
        </div>

        <div className="space-y-4 font-sans text-xs sm:text-sm">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left font-sans font-extrabold text-blue-900 flex justify-between items-center py-2 focus:outline-none focus:text-blue-600 transition"
                  id={`faq-btn-${idx}`}
                >
                  <span className="pr-4">{faq.question}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-red-500" /> : <ChevronDown className="w-4 h-4 shrink-0 text-blue-600" />}
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed text-xs sm:text-sm font-medium pt-2 pb-1 bg-slate-50 p-3.5 rounded-lg border border-gray-100 mt-1">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Newsletter Sign-up Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-red-500 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 flex-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-sans font-extrabold uppercase">
              Subscribe to Newsletter
            </h4>
            <p className="text-red-100 text-xs leading-relaxed max-w-md">
              Get immediate alerts regarding holiday notices, SEE examination reports, and school expansion projects dispatched online.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <AnimatePresence mode="wait">
              {!newsletterSubscribed ? (
                <motion.form 
                  onSubmit={handleSubscribe} 
                  className="flex flex-col sm:flex-row w-full sm:max-w-md gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input 
                    type="email" 
                    placeholder="parent@example.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="p-3 text-slate-950 bg-white border-0 focus:ring-4 focus:ring-amber-300 outline-none text-xs sm:text-sm rounded-lg w-full"
                    id="newsletter-email-input"
                  />
                  <button 
                    type="submit"
                    className="p-3 bg-blue-900 hover:bg-blue-950 font-sans font-extrabold text-xs uppercase tracking-wider rounded-lg text-white shadow-md active:scale-[0.99] transition shrink-0 inline-flex items-center justify-center space-x-1"
                    id="newsletter-subscribe-button"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Join Alerts</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="p-3 bg-white/20 border border-white/20 backdrop-blur-sm rounded-lg flex items-center space-x-2 text-xs font-bold"
                >
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                  <span>Subscribed Successfully! Enjoy Email Notices.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Notice Detail Expandable Dialog/Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-150 relative space-y-4 text-left font-sans text-xs sm:text-sm"
            >
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <span className="bg-red-50 text-red-650 text-[10px] uppercase font-sans font-bold px-2.5 py-1 rounded border border-red-100">
                    {selectedNotice.category} Notice
                  </span>
                  <p className="text-[10px] text-gray-400 font-mono mt-2 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Published: {selectedNotice.date}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="p-1 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  title="Close Notice Detail"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-md sm:text-lg font-sans font-extrabold text-blue-950 leading-tight">
                  {selectedNotice.title}
                </h4>
                <p className="text-gray-650 leading-relaxed text-xs sm:text-sm font-medium pt-2">
                  {selectedNotice.content}
                </p>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-[11px] text-blue-800 leading-relaxed font-semibold">
                For further detailed alignments or to submit physical credentials, please visit coordinate pre-schools blocks or drop us an email at <strong>{SCHOOL_INFO.emails[0]}</strong>.
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
