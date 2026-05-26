/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SCHOOL_INFO } from '../data';
import { EnrollmentSubmission } from '../types';
import { 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  ShieldCheck, 
  Upload, 
  ArrowRight, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EnrollmentView() {
  const [formData, setFormData] = useState<EnrollmentSubmission>({
    studentName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    permanentAddress: '',
    temporaryAddress: '',
    contactNumber: '',
    email: '',
    previousSchool: '',
    gradeApplying: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentSubmission, string>>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<EnrollmentSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated file uploads
  const [attachments, setAttachments] = useState({
    academicCertificate: null as string | null,
    dobCertificate: null as string | null,
    ppPhoto: null as string | null
  });

  const grades = [
    'Nursery', 'LKG', 'UKG',
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'
  ];

  const validate = () => {
    const errs: Partial<Record<keyof EnrollmentSubmission, string>> = {};

    if (!formData.studentName.trim()) errs.studentName = 'Student name is required.';
    if (!formData.fatherName.trim()) errs.fatherName = "Father's name is required.";
    if (!formData.motherName.trim()) errs.motherName = "Mother's name is required.";
    if (!formData.dob) errs.dob = 'Date of birth is required.';
    if (!formData.permanentAddress.trim()) errs.permanentAddress = 'Permanent address is required.';
    if (!formData.contactNumber.trim()) {
      errs.contactNumber = 'Contact number is required.';
    } else if (!/^[056789]\d{9,11}$/.test(formData.contactNumber.replace(/[^\d]/g, ''))) {
      errs.contactNumber = 'Please supply a robust 10-digit mobile number.';
    }
    if (!formData.previousSchool.trim()) errs.previousSchool = 'Please specify your previous academic institution.';
    if (!formData.gradeApplying) errs.gradeApplying = 'Please pick a Grade applying for.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnrollmentSubmission]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle mock file uploads
  const handleMockUpload = (field: 'academicCertificate' | 'dobCertificate' | 'ppPhoto', fileName: string) => {
    setAttachments(prev => ({ ...prev, [field]: fileName }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'enrollments'), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setReceiptData({ ...formData });
      setIsSuccess(true);
      // reset state
      setFormData({
        studentName: '',
        fatherName: '',
        motherName: '',
        dob: '',
        permanentAddress: '',
        temporaryAddress: '',
        contactNumber: '',
        email: '',
        previousSchool: '',
        gradeApplying: ''
      });
      setAttachments({
        academicCertificate: null,
        dobCertificate: null,
        ppPhoto: null
      });
    } catch (error) {
      setErrors({ ...errors, studentName: 'Unable to submit enrollment. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-sans text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full">
            Admissions Desk 2083
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-blue-900 tracking-tight leading-tight uppercase mt-3">
            Online Enrollment Portal
          </h2>
          <div className="h-1 bg-red-600 w-24 mx-auto my-4 rounded-full" />
          <p className="text-gray-650 text-xs sm:text-base font-medium leading-relaxed">
            Begin your child's journey to stellar growth and digital readiness today. We follow an inclusive, parent-friendly admission process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Guidelines, Required Documents & Process */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Admissions Guidelines */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 space-y-4">
              <h3 className="text-md font-sans font-extrabold text-blue-950 uppercase border-b pb-2 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Admission Guidelines</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Admissions for the upcoming <strong>Academic Session 2083</strong> are actively open for classes Nursery through Grade IX. We prioritize peer diversity, basic literacy benchmarks, and active logical reasoning.
              </p>
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 space-y-2 text-[11px] text-blue-800">
                <p className="font-bold">Evaluation Directives:</p>
                <p className="leading-relaxed">
                  Applicants from primary blocks onward will sit for a friendly 1-hour interactive entrance assessment in Basic English, Arithmetic, and General Science.
                </p>
              </div>
            </div>

            {/* Required Documents List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 space-y-4">
              <h3 className="text-md font-sans font-extrabold text-blue-950 uppercase border-b pb-2 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-red-650" />
                <span>Required Documents</span>
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Please procure and submit the following papers during administrative physical verification on campus:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-700 font-medium items-start">
                  <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
                  <div>
                    <span className="block font-bold">Previous Class Pass Certificate / Transcript</span>
                    <span className="text-gray-400 text-[10px]">Except for Nursery applicant levels.</span>
                  </div>
                </li>
                <li className="flex gap-2 text-xs text-gray-700 font-medium items-start">
                  <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
                  <div>
                    <span className="block font-bold">Government-Issued Date of Birth Certificate</span>
                    <span className="text-gray-400 text-[10px]">Issued by Municipal ward office or local registrar.</span>
                  </div>
                </li>
                <li className="flex gap-2 text-xs text-gray-700 font-medium items-start">
                  <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
                  <div>
                    <span className="block font-bold">Recent Passport-Size (PP) Photograph</span>
                    <span className="text-gray-400 text-[10px]">Two active copies with student wearing white shirt background.</span>
                  </div>
                </li>
                <li className="flex gap-2 text-xs text-gray-700 font-medium items-start">
                  <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
                  <div>
                    <span className="block font-orange-500 font-extrabold text-[#fc5c04]">IEMIS Code Number</span>
                    <span className="text-gray-400 text-[10px]">Mandatory government tracking code. Prepared on-site AFTER actual school enrollment.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Step-by-Step Admissions Process */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-md">
              <h3 className="text-md font-sans font-extrabold uppercase border-b border-white/10 pb-2 flex items-center space-x-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Our Simple Admissions Path</span>
              </h3>
              <div className="space-y-4 text-xs font-sans">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                  <div>
                    <strong className="block text-amber-300">Submit Application</strong>
                    <span>Complete this online portal setup or report to on-site reception.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                  <div>
                    <strong className="block text-amber-300">Interactive Assessment</strong>
                    <span>Attend evaluation test scheduled at school (Sunday - Friday).</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                  <div>
                    <strong className="block text-amber-300">Document Review & Fee Clear</strong>
                    <span>Submit original certificates, upload records, and pay foundational term fees.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Enrollment Form Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-150">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="enroll-form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="border-b pb-4">
                      <h3 className="text-lg md:text-xl font-sans font-extrabold text-blue-950 uppercase tracking-widest">
                        Student Registration Form
                      </h3>
                      <p className="text-gray-450 text-[11px] sm:text-xs">
                        Fill in all credentials carefully. Fields highlighted with <span className="text-red-500 font-bold">*</span> are critical.
                      </p>
                    </div>

                    {/* Student Basic Info Block */}
                    <div className="space-y-5">
                      <span className="text-xs uppercase font-extrabold text-red-650 tracking-wider block border-l-4 border-red-600 pl-2">
                        1. Personal Details
                      </span>
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Student Full Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="studentName"
                          placeholder="e.g. Shyam Raj Bhandari"
                          value={formData.studentName}
                          onChange={handleTextChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.studentName ? 'border-red-500 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {errors.studentName && <span className="text-[11px] font-bold text-red-600">{errors.studentName}</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Father Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Father's Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            name="fatherName"
                            placeholder="e.g. Kedar Nath Bhandari"
                            value={formData.fatherName}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.fatherName ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors.fatherName && <span className="text-[11px] font-bold text-red-600">{errors.fatherName}</span>}
                        </div>

                        {/* Mother Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Mother's Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            name="motherName"
                            placeholder="e.g. Radhika Devi Bhandari"
                            value={formData.motherName}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.motherName ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors.motherName && <span className="text-[11px] font-bold text-red-600">{errors.motherName}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* DOB Date */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Date of Birth <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="date" 
                            name="dob"
                            value={formData.dob}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 text-gray-600 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors.dob && <span className="text-[11px] font-bold text-red-600">{errors.dob}</span>}
                        </div>

                        {/* Grade applying Select */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Grade Applying For <span className="text-red-500">*</span>
                          </label>
                          <select 
                            name="gradeApplying"
                            value={formData.gradeApplying}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 text-gray-700 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.gradeApplying ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          >
                            <option value="">-- Click to Select Class --</option>
                            {grades.map((gr, idx) => (
                              <option key={idx} value={gr}>{gr}</option>
                            ))}
                          </select>
                          {errors.gradeApplying && <span className="text-[11px] font-bold text-red-600">{errors.gradeApplying}</span>}
                        </div>
                      </div>

                    </div>

                    {/* Address & contact details */}
                    <div className="space-y-5 pt-4">
                      <span className="text-xs uppercase font-extrabold text-red-650 tracking-wider block border-l-4 border-red-600 pl-2">
                        2. Contact & Communications
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Permanent Address */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Permanent Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            name="permanentAddress"
                            placeholder="e.g. Nepalgunj-01, Banke"
                            value={formData.permanentAddress}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.permanentAddress ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors.permanentAddress && <span className="text-[11px] font-bold text-red-600">{errors.permanentAddress}</span>}
                        </div>

                        {/* Temporary Address Optional */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Temporary Address <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input 
                            type="text" 
                            name="temporaryAddress"
                            placeholder="e.g. Dhamboji-02, Nepalgunj"
                            value={formData.temporaryAddress}
                            onChange={handleTextChange}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Contact Phone */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Parent Contact Phone <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="tel" 
                            name="contactNumber"
                            placeholder="e.g. 98580XXXXX / 081XXXXX"
                            value={formData.contactNumber}
                            onChange={handleTextChange}
                            className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                              errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors.contactNumber && <span className="text-[11px] font-bold text-red-600">{errors.contactNumber}</span>}
                        </div>

                        {/* Email Optional */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                            Parent Email Address <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            placeholder="e.g. parent@bhandari.com"
                            value={formData.email}
                            onChange={handleTextChange}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition"
                          />
                        </div>
                      </div>

                    </div>

                    {/* School History details */}
                    <div className="space-y-5 pt-4">
                      <span className="text-xs uppercase font-extrabold text-red-650 tracking-wider block border-l-4 border-red-600 pl-2">
                        3. Prior Academics / History
                      </span>

                      {/* Previous School */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                          Previous Attended School / Kindergarten <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="previousSchool"
                          placeholder="e.g. Star Bright Kid Palace, Nepalgunj"
                          value={formData.previousSchool}
                          onChange={handleTextChange}
                          className={`w-full p-3 border rounded-lg text-sm bg-slate-50 outline-none focus:bg-white focus:border-blue-600 transition ${
                            errors.previousSchool ? 'border-red-500 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {errors.previousSchool && <span className="text-[11px] font-bold text-red-600">{errors.previousSchool}</span>}
                      </div>
                    </div>

                    {/* Files upload components */}
                    <div className="space-y-5 pt-4">
                      <span className="text-xs uppercase font-extrabold text-red-650 tracking-wider block border-l-4 border-red-600 pl-2">
                        4. Support Certificates <span className="text-gray-400 font-normal lowercase">(optional fields for instant online upload)</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* 1. Academic Certificate */}
                        <div className={`p-4 border border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition ${
                          attachments.academicCertificate ? 'bg-emerald-50/50 border-emerald-400' : 'bg-slate-50 hover:bg-slate-100/50 border-gray-300'
                        }`}
                        onClick={() => handleMockUpload('academicCertificate', 'Previous_Class_Marksheet.pdf')}
                        >
                          <Upload className={`w-5 h-5 mb-2 ${attachments.academicCertificate ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <span className="text-[11px] font-bold text-gray-700 block line-clamp-1">
                            {attachments.academicCertificate || 'Class Pass Certificate'}
                          </span>
                          <span className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wide">
                            {attachments.academicCertificate ? 'Attached ✓' : 'Click to Upload'}
                          </span>
                        </div>

                        {/* 2. DOB Certificate */}
                        <div className={`p-4 border border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition ${
                          attachments.dobCertificate ? 'bg-emerald-50/50 border-emerald-400' : 'bg-slate-50 hover:bg-slate-100/50 border-gray-300'
                        }`}
                        onClick={() => handleMockUpload('dobCertificate', 'DOB_Birth_Record.pdf')}
                        >
                          <Upload className={`w-5 h-5 mb-2 ${attachments.dobCertificate ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <span className="text-[11px] font-bold text-gray-700 block line-clamp-1">
                            {attachments.dobCertificate || 'Birth Certificate'}
                          </span>
                          <span className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wide">
                            {attachments.dobCertificate ? 'Attached ✓' : 'Click to Upload'}
                          </span>
                        </div>

                        {/* 3. PP Photo */}
                        <div className={`p-4 border border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition ${
                          attachments.ppPhoto ? 'bg-emerald-50/50 border-emerald-400' : 'bg-slate-50 hover:bg-slate-100/50 border-gray-300'
                        }`}
                        onClick={() => handleMockUpload('ppPhoto', 'Student_PP_Portrait.png')}
                        >
                          <Upload className={`w-5 h-5 mb-2 ${attachments.ppPhoto ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <span className="text-[11px] font-bold text-gray-700 block line-clamp-1">
                            {attachments.ppPhoto || 'Passport Size Photo'}
                          </span>
                          <span className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wide">
                            {attachments.ppPhoto ? 'Attached ✓' : 'Click to Upload'}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Form Submit buttons */}
                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition disabled:cursor-not-allowed disabled:bg-red-300"
                        id="enrollment-submit-button"
                      >
                        {isSubmitting ? 'Submitting…' : 'File Application & Review Codes'}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="enroll-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-10 space-y-6 animate-fade-in"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle className="w-10 h-10 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-sans font-extrabold text-blue-950 uppercase">
                        Application Filed Successfully!
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
                        The registration records have been lodged in our database systems. Tilak Kanojiya (IT Admin & Registrar Team) will verify your documents shortly.
                      </p>
                    </div>

                    {/* Application Details Summary */}
                    {receiptData && (
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 shadow-inner text-xs">
                        <div className="text-xs uppercase font-extrabold text-red-600 border-b pb-2 tracking-wide flex items-center space-x-1">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>Student Enrollment Invoice</span>
                        </div>
                        <div className="space-y-2 text-gray-600 font-sans">
                          <div>
                            <strong className="text-slate-800">Student Name:</strong> {receiptData.studentName}
                          </div>
                          <div>
                            <strong className="text-slate-800">Father's Name:</strong> {receiptData.fatherName}
                          </div>
                          <div>
                            <strong className="text-slate-800">Mother's Name:</strong> {receiptData.motherName}
                          </div>
                          <div>
                            <strong className="text-slate-800">Applying For:</strong> <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">{receiptData.gradeApplying}</span>
                          </div>
                          <div>
                            <strong className="text-slate-800">Permanent Address:</strong> {receiptData.permanentAddress}
                          </div>
                          <div>
                            <strong className="text-slate-800">Contact Number:</strong> {receiptData.contactNumber}
                          </div>
                          <div>
                            <strong className="text-slate-800">Prior School:</strong> {receiptData.previousSchool}
                          </div>
                          <div>
                            <strong className="text-red-700 font-bold uppercase block text-[10px] bg-red-50 p-2 border border-red-100 rounded mt-3">
                              Next Steps: Report to Sun Beam registrar with physical DOB copy & previous marksheet for test reservation.
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setReceiptData(null);
                        }}
                        className="inline-flex items-center space-x-1 bg-red-50 border border-red-200 text-red-650 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-100 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        <span>Submit Another Application</span>
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
