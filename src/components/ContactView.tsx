/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SCHOOL_INFO } from '../data';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  Facebook, 
  Youtube, 
  Instagram, 
  MessageCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Please supply both Name and Message values.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setIsSent(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      const message = error instanceof Error ? error.message : 'Unable to send the message. Please try again later.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-sans text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Locate Us
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase mt-3">
            Contact & Address Registers
          </h2>
          <div className="h-1 bg-red-650 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-650 text-xs sm:text-base font-medium leading-relaxed">
            Have queries regarding school buses, admissions fee scales, or co-curricular programs? Connect with our administration team or find us on the map.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Coordinates & Information */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Address box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-red-50 text-red-650 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                  School Location
                </h4>
                <p className="text-sm font-sans font-extrabold text-blue-950">
                  {SCHOOL_INFO.name}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {SCHOOL_INFO.location}
                </p>
              </div>
            </div>

            {/* Phone lines list */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Official Phone Lines
                </h4>
                <div className="space-y-1 font-sans text-xs sm:text-sm text-blue-950 font-bold">
                  {SCHOOL_INFO.phones.map((ph, idx) => (
                    <a key={idx} href={`tel:${ph}`} className="block hover:underline hover:text-blue-600">
                      {ph} {idx === 0 ? '(Reception Office)' : ''}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Official emails box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Email Correspondence
                </h4>
                <div className="space-y-1 font-sans text-xs sm:text-sm text-blue-950 font-bold">
                  {SCHOOL_INFO.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`} className="block hover:underline hover:text-blue-600 break-all">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours & Schedule info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Office Schedule
                </h4>
                <p className="text-sm font-sans font-bold text-blue-950">
                  {SCHOOL_INFO.officeHours}
                </p>
                <p className="text-xs text-gray-500">
                  Closed on Saturdays. Entry allowed to visitors during school curation assemblies only.
                </p>
              </div>
            </div>

            {/* Social handles links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                Connect Digitally
              </h4>
              <div className="flex gap-2.5">
                <a 
                  href={SCHOOL_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-blue-50 text-blue-800 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={SCHOOL_INFO.socials.whatsapp} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                {/* <a 
                  href={SCHOOL_INFO.socials.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-red-50 text-red-650 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                  title="Youtube Channel"
                >
                  <Youtube className="w-5 h-5" />
                </a> */}
                <a 
                  href={SCHOOL_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-xl transition-all shadow-sm"
                  title="Instagram Page"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps & Contact form */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Real embedded Google Map centered at Nepalgunj, Banke */}
            <div className="bg-white rounded-2xl border border-gray-150 p-3 shadow-md">
              <div className="h-72 w-full rounded-xl overflow-hidden relative shadow-inner">
                {/* Embed code centered on Nepalgunj 01 Banke Nepal */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14138.835921815189!2d81.61661623126756!3d28.053184635817545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399734e55d644dff%3A0x7d6c6bc76f57df52!2sNepalgunj%2001%2C%20Banke!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Sun Beam School Nepalgunj Google Maps Marker"
                />
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-150 relative">
              
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSendMessage} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-sans font-extrabold text-blue-950 uppercase border-b pb-2 flex items-center space-x-1">
                        <span>Send Us A Message</span>
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        Submit immediate inquiries, greetings, or feedback to the registrar desk.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase block">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Shyam Kumar Shrestha"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase block">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="shyam@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition"
                        />
                      </div>

                    </div>

                    {/* Subject input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase block">
                        Subject Line
                      </label>
                      <input 
                        type="text" 
                        name="subject"
                        placeholder="Inquiry about school bus routes / admission details"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition"
                      />
                    </div>

                    {/* Message body input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase block">
                        Detailed Message <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        name="message"
                        rows={4}
                        placeholder="Type your question or support details here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition resize-none"
                      />
                    </div>

                    {/* Submit banner */}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:bg-blue-300 flex items-center justify-center space-x-2 active:scale-[0.99]"
                      id="contact-submit-button"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending…' : 'Transmit Message'}</span>
                    </button>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="contact-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-sans font-extrabold text-blue-950 uppercase">
                        Inquiry Received!
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
                        Thank you for reaching out. A copy of your notes has been routed to the administrative office queue.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsSent(false)}
                      className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider hover:bg-blue-100 transition-colors"
                    >
                      <span>New Message</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
