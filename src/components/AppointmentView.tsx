/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SCHOOL_INFO } from '../data';
import { AppointmentSubmission } from '../types';
import { 
  CalendarClock, 
  UserCheck, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  FileCheck, 
  Plus, 
  ShieldAlert 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AppointmentView() {
  const [formData, setFormData] = useState<AppointmentSubmission>({
    parentName: '',
    phoneNumber: '',
    address: '',
    email: '',
    date: '',
    purpose: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentSubmission, string>>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<AppointmentSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const purposeOptions = [
    'New Admission Inquiry',
    'Principal Consultation',
    'Financial/Billing Query',
    'Student Counselor Meeting',
    'Document Submission & Verification',
    'Pre-School Program Overview',
    'General Facilities Tour'
  ];

  // Simple client-side Validation
  const validateForm = () => {
    const newErrors: Partial<Record<keyof AppointmentSubmission, string>> = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Student full name is required.';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Contact phone number is required.';
    } else if (!/^[056789]\d{9,11}$/.test(formData.phoneNumber.replace(/[^\d]/g, ''))) {
      newErrors.phoneNumber = 'Provide a valid contact number (10 digits).';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Communication address is required.';
    }
    if (!formData.date) {
      newErrors.date = 'Select a valid appointment date.';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        newErrors.date = 'Appointment date cannot be in the past.';
      }
      if (selectedDate.getDay() === 6) { // Saturday is off
        newErrors.date = 'Appointments are unavailable on Saturdays (School holiday).';
      }
    }
    if (!formData.purpose) {
      newErrors.purpose = 'Please select a meeting purpose.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof AppointmentSubmission]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmittedData({ ...formData });
      setIsSuccess(true);
      setFormData({
        parentName: '',
        phoneNumber: '',
        address: '',
        email: '',
        date: '',
        purpose: '',
        message: ''
      });
    } catch (error) {
      setErrors({ ...errors, purpose: 'Unable to submit request. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-650 font-sans text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-100 px-3.5 py-1 rounded-full">
            Connect Securely
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase mt-3">
            Book an Appointment
          </h2>
          <div className="h-1 bg-blue-600 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-650 text-xs sm:text-base font-medium leading-relaxed">
            Schedule a personal visit or counseling session with our principal, registrar, or preschool director. We promise transparent support steps for every query.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Side Info Cards Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Office timing information */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-blue-800">
              <h3 className="text-lg font-sans font-extrabold flex items-center space-x-2 border-b border-white/10 pb-3 uppercase tracking-wide">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Office Hours</span>
              </h3>
              <div className="mt-4 space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-blue-200">Sunday - Thursday:</span>
                  <span className="font-bold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-blue-200">Friday Hours:</span>
                  <span className="font-bold">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-red-300 font-bold">Saturday:</span>
                  <span className="font-semibold text-gray-300">Holiday</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5 text-[11px] text-blue-200 leading-relaxed">
                Parents are requested to secure bookings <strong>at least 24 hours</strong> in advance to guarantee supervisor availability.
              </div>
            </div>

            {/* In-person meeting regulations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 space-y-4">
              <h3 className="text-md font-sans font-extrabold text-blue-950 uppercase border-b pb-2">
                Important Directives
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2.5 items-start text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-650 flex items-center justify-center font-bold text-[10px] shrink-0 pointer-events-none">1</span>
                  <span>Please carry valid photo identification (Citizenship card or license) at the gate lobby.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-650 flex items-center justify-center font-bold text-[10px] shrink-0 pointer-events-none">2</span>
                  <span>If discussing admissions, bring your child's previous grade transcripts if applicable.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-650 flex items-center justify-center font-bold text-[10px] shrink-0 pointer-events-none">3</span>
                  <span>A confirmation SMS or Call will be dispatched to your phone by our operator (Tilak Kanojiya).</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Form Interactive Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-150">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="appointment-form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg md:text-xl font-sans font-extrabold text-blue-950 flex items-center space-x-2 border-b pb-3 uppercase tracking-wide">
                      <CalendarClock className="w-5 h-5 text-blue-600" />
                      <span>Request Meeting Slot</span>
                    </h3>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Parent / Student Full Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="parentName"
                          placeholder="e.g. Ram Bahadur Chaudhary"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.parentName ? 'border-red-500 bg-red-50' : ''
                          }`}
                        />
                        {errors.parentName && <span className="text-[11px] font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" />{errors.parentName}</span>}
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Contact Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          name="phoneNumber"
                          placeholder="e.g. 98580XXXXX / 081XXXXX"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.phoneNumber ? 'border-red-500 bg-red-50' : ''
                          }`}
                        />
                        {errors.phoneNumber && <span className="text-[11px] font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" />{errors.phoneNumber}</span>}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Resident Address */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Permanent Address <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="address"
                          placeholder="e.g. Nepalgunj-04, Banke"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.address ? 'border-red-500 bg-red-50' : ''
                          }`}
                        />
                        {errors.address && <span className="text-[11px] font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" />{errors.address}</span>}
                      </div>

                      {/* Optional Email Address */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Email Address <span className="text-gray-400">(Optional)</span>
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="e.g. parent@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 outline-none focus:bg-white focus:border-blue-600 transition"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Meeting Target Date */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Preferred Appointment Date <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.date ? 'border-red-500 bg-red-50' : ''
                          }`}
                        />
                        {errors.date && <span className="text-[11px] font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" />{errors.date}</span>}
                      </div>

                      {/* Purpose Select Option */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Purpose of Visit <span className="text-red-500">*</span>
                        </label>
                        <select 
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 border-gray-200 text-gray-700 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.purpose ? 'border-red-500 bg-red-50' : ''
                          }`}
                        >
                          <option value="">-- Choose Purpose --</option>
                          {purposeOptions.map((opt, oIdx) => (
                            <option key={oIdx} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {errors.purpose && <span className="text-[11px] font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" />{errors.purpose}</span>}
                      </div>

                    </div>

                    {/* Specific Message / Context Box */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        Detailed Message / Details of Request
                      </label>
                      <textarea 
                        name="message"
                        rows={4}
                        placeholder="Please elaborate on your requirements (e.g., student name and grade, prior school detail, specific questions etc.)."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-blue-300"
                      id="appointment-submit-button"
                    >
                      {isSubmitting ? 'Processing…' : 'Process & Submit Reservation'}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="appointment-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-sans font-extrabold text-blue-950 uppercase">
                        Appointment Confirmed!
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
                        We have logged your request. Your booking credentials have been mapped into our administrative queue.
                      </p>
                    </div>

                    {/* Summary Information Invoice Card */}
                    {submittedData && (
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 shadow-inner">
                        <div className="text-xs uppercase font-extrabold text-blue-900 border-b pb-2 tracking-wide flex items-center space-x-1">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          <span>Appointment Receipt</span>
                        </div>
                        <div className="text-xs space-y-2 text-gray-600">
                          <div>
                            <strong className="text-slate-800">Visitor:</strong> {submittedData.parentName}
                          </div>
                          <div>
                            <strong className="text-slate-800">Phone:</strong> {submittedData.phoneNumber}
                          </div>
                          <div>
                            <strong className="text-slate-800">Date Proposed:</strong> {submittedData.date}
                          </div>
                          <div>
                            <strong className="text-slate-800">Purpose Node:</strong> {submittedData.purpose}
                          </div>
                          {submittedData.email && (
                            <div>
                              <strong className="text-slate-800">Email:</strong> {submittedData.email}
                            </div>
                          )}
                          {submittedData.message && (
                            <div>
                              <strong className="text-slate-800">Pre-notes:</strong> "{submittedData.message}"
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setSubmittedData(null);
                        }}
                        className="inline-flex items-center space-x-1 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Book Another Slot</span>
                      </button>
                    </div>

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
