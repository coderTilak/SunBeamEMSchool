/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveView = 
  | 'home' 
  | 'about' 
  | 'leadership' 
  | 'gallery' 
  | 'appointment' 
  | 'enroll' 
  | 'contact'
  | 'admin';

export interface LeaderProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
  message?: string;
  experience?: string;
  responsibilities?: string[];
}

export interface DirectorProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AdminProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
  responsibilities: string[];
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Admission' | 'Event' | 'Holiday' | 'General';
  content: string;
  isImportant?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'School Events' | 'Sports' | 'Cultural Programs' | 'Classroom Activities' | 'Annual Functions' | 'Tours and Excursions';
  date: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: 'Parent' | 'Student' | 'Alumni';
  content: string;
  rating: number;
  year: string;
}

export interface EnrollmentSubmission {
  studentName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  permanentAddress: string;
  temporaryAddress?: string;
  contactNumber: string;
  email?: string;
  previousSchool: string;
  gradeApplying: string;
}

export interface AppointmentSubmission {
  parentName: string;
  phoneNumber: string;
  address: string;
  email?: string;
  date: string;
  purpose: string;
  message: string;
}
