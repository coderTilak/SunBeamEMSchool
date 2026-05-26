/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LeaderProfile, 
  DirectorProfile, 
  AdminProfile, 
  NoticeItem, 
  SchoolEvent, 
  GalleryPhoto, 
  TestimonialItem 
} from './types';

// Core School Info
export const SCHOOL_INFO = {
  name: "Sun Beam English Medium School",
  location: "Nepalgunj-01, Banke, Nepal",
  tagline: "Nurturing Minds, Shaping Destinies",
  motto: "A Place of Academic Excellence, Innovation, & Values",
  established: "2059 BS (2002 AD)",
  affiliated: "Executive Partner with Adarsh Ma. Vi.",
  phones: ["081-36422", "9858036422", "9858056424", "9858066424"],
  emails: ["sunbeamschool077@gmail.com"],
  officeHours: "Sunday to Friday, 9:00 AM - 5:00 PM",
  socials: {
    facebook: "https://www.facebook.com/sunbeamsschool12",
    // youtube: "https://youtube.com/sunbeamnpj",
    instagram: "https://www.instagram.com/sunbeamschool07/",
    whatsapp: "https://wb.me/9858036422"
  }
};

// Hero Slides
export const HERO_SLIDES = [
  {
    image: "/schoolphoto2.jpg",
    subtitle: "Welcome to Sun Beam English Medium School",
    title: "Empowering Students to Achieve Global Excellence",
    description: "Located in Nepalgunj-01, Banke, we combine modern technology, values-driven pedagogy, and dedicated staff to build future-ready leaders."
  },
  {
    image: "/photo6.jpg",
    subtitle: "A Center of Holistic Growth",
    title: "Vibrant Learning & Active Exploration",
    description: "Through advanced laboratories, comprehensive arts programmes, modern smart classes, and interactive group discussions, education here knows no bounds."
  },
   {
    image: "/photo2.jpg",
    subtitle: "A Center of Holistic Growth",
    title: "Visited Manabsewa Aashram ",
    description: "Understanding the importance of community engagement."
  },
    {
    image: "/photo3.jpg",
    subtitle: "A Center of Holistic Growth", 
    title: "Vibrant Learning & Active Exploration",
    description: "Through advanced laboratories, comprehensive arts programmes, modern smart classes, and interactive group discussions, education here knows no bounds."
  },
       {
    image: "/photo4.jpg",
    subtitle: "A Center of Holistic Growth",
    title: "Vibrant Learning & Active Exploration",
    description: "Through advanced laboratories, comprehensive arts programmes, modern smart classes, and interactive group discussions, education here knows no bounds."
  },
    {
    image: "/photo5.jpg",
    subtitle: "A Center of Holistic Growth",
    title: "Vibrant Learning & Active Exploration",
    description: "Through advanced laboratories, comprehensive arts programmes, modern smart classes, and interactive group discussions, education here knows no bounds."
  },

        {
    image: "/photo7.jpg",
    subtitle: "A Center of Holistic Growth",
    title: "Vibrant Learning & Active Exploration",
    description: "Through advanced laboratories, comprehensive arts programmes, modern smart classes, and interactive group discussions, education here knows no bounds."
  }
 
];

// Principal & Chairman Messages (Leadership)
export const LEADERS: { principal: LeaderProfile; chairman: LeaderProfile } = {
  principal: {
    name: "Mr. Shant Bahadur Malla",
    role: "Principal",
    image: "/photo7.jpg",
    bio: "Under Mr. Shant Bahadur Malla's outstanding leadership, Sun Beam English Medium School has consistently scaled academic and extracurricular peaks. Dedicated to quality, he blends rigorous curriculum guidelines with interactive individual care.",
    message: "At Sun Beam English Medium School, we believe that education is not merely the acquisition of facts, but the training of the mind to think critically. We seek to inspire curiosity, instill emotional intelligence, and foster active citizenship in each child. Our school is a vibrant landscape of opportunities, and we welcome all prospective families to join us in this magnificent journey of knowledge.",
    experience: "Over 20+ years of educational management and administrative excellence in high-ranking academies throughout Nepal."
  },
  chairman: {
    name: "Mr. Ishwor Prasad Pokhrel",
    role: "Chairman",
    image: "/ip.jfif",
    bio: "Mr. Ishwor Prasad Pokhrel guides the school’s long-term vision with stellar execution. His primary goal is making top-tier educational assets available to students in Nepalgunj and Banke district, preparing them for overseas success or local innovation.",
    message: "As Chairman, my promise is to constantly enrich our learning infrastructure with modern technology, secure classrooms, and elite professional talent. Through our special executive partnership with Adarsh Ma. Vi., we are establishing academic standards that set a benchmark for public-private synergy in Banke district. Let us work hand in hand to light the path for future generations.",
    experience: "Prominent local leader, philanthropist, and educational entrepreneur with decades of contribution to educational policy."
  }
};

// Directors Profile List (12 directors)
export const DIRECTORS: DirectorProfile[] = [
  {
    name: "Mr. Prakash Lamichhane",
    role: "Managing Director",
    image: "/prakash.jpg",
    bio: "Supervises general school logistics, business relations, and legal affairs. Focuses on operational efficiency."
  },
  {
    name: "Mr. Sanjay Thapa",
    role: "Director of Academics",
    image: "/sanjay.jpg",
    bio: "Orchestrates curriculum integration, pedagogical updates, teacher evaluation metrics, and advanced learning schedules."
  },
  {
    name: "Dr. Raj Kumar Subedi",
    role: "Medical & Health Advisor",
    image: "/raj-kumar.jpg",
    bio: "Guides student sanitation guidelines, wellness programs, and leads seasonal free health camps for the school community."
  },
  {
    name: "Mr. Giriraj Paudel",
    role: "Director of Administration",
    image: "/giriraj.jpg",
    bio: "Manages public relations, government compliance, policy formulation, and coordinates regional educational board partnerships."
  },
  {
    name: "Mr. Chet Chapagain",
    role: "Advisory Council Chairman",
    image: "/chet.jpg",
    bio: "Acts as a primary advisor on board ethics, institutional integrity, expansion projects, and community alignment."
  },
  {
    name: "Mr. Pawan Gautam",
    role: "Finance Director",
    image: "/pawan.jpg",
    bio: "Formulates budget maps, oversees infrastructure funding, and ensures financial compliance with local regulations."
  },
  {
    name: "Mr. Mukesh K. Gupta",
    role: "PR Director",
    image: "/src/assets/images/",
    bio: "Oversees media communications, community outreach programs, and manages partnerships with corporate and non-profit sponsors."
  },
  {
    name: "Mr. Niraj Gautam",
    role: "Facilities & Operations Director",
    image: "/niraj.jpg",
    bio: "Monitors classroom architecture, smart-board installations, transportation fleet safety, and playground maintenance."
  },
  {
    name: "Mrs. Bhagwati Parajuli",
    role: "Holistic Development Lead",
    image: "/bhagwati.jpg",
    bio: "Pioneers extra-curricular strategies, moral value classes, dynamic youth clubs, and creative writing programs."
  },
  {
    name: "Mrs. Sangam Malla",
    role: "HR & Welfare Director",
    image: "/sangam.jpg",
    bio: "Oversees professional recruitment, staffing, teacher skill-building workshops, and student support services."
  },
  {
    name: "Mr. Anil K Agrawal",
    role: "Strategic Industry Liaison",
    image: "/anil.jpg",
    bio: "Creates digital collaboration pipelines, vocational guidance paths, and connects technical institutes with graduating cohorts."
  },
  {
    name: "Mr. Rajendra P. Gautam",
    role: "Socio-Cultural Director",
    image: "/rajendra.jpg",
    bio: "Promotes traditional heritage, cultural day programs, art festivals, music events, and community-driven charitable actions."
  }
];

// Administration Team Section (5 profiles)
export const ADMINISTRATION: AdminProfile[] = [
  {
    name: "Mrs. Riya Chaudhary",
    role: "School Coordinator",
    image: "/riya.jpg",
    bio: "Coordinates high school planning, maps daily class timings, oversees examinations, and mediates parental feedback sessions.",
    responsibilities: [
      "School Exam Schedules & Performance Reviews",
      "Teacher-Parent Consultations Coordination",
      "Syllabus Timelines Maintenance"
    ]
  },
  {
    name: "Mrs. Sarita Singh",
    role: "Pre-Primary Coordinator",
    image: "/sarita.jpg",
    bio: "Specializes in early childhood care and interactive play-based learning to make transition into school vibrant for toddlers.",
    responsibilities: [
      "Montessori Method Application",
      "Kids Cognitive Games & Moral Storytelling Sessions",
      "Early Childhood Nutrition & Welfare Monitoring"
    ]
  },
  {
    name: "Mr. Keshav Bhandari",
    role: "Senior Accountant",
    image: "/keshav.jpg",
    bio: "Drives fiscal execution, processes monthly payrolls, oversees budgets, and handles annual audits and procurement details.",
    responsibilities: [
      "Financial Reporting & Taxation Management",
      "Academic Budget Formulations",
      "School Logistics and Fee Structuring"
    ]
  },
  {
    name: "Mrs. Yamuna Rokaya",
    role: "Assistant Accountant",
    image: "/yamuna.png",
    bio: "Assists parents with billing questions, resolves billing errors, logs uniform purchases, and processes online payments.",
    responsibilities: [
      "Student Fee Collection counter relations",
      "Invoice and Receipts ledger management",
      "Daily Cashflow Balancing & Registration bookkeeping"
    ]
  },
  {
    name: "Tilak Kanojiya",
    role: "Computer Operator & IT Systems Admin",
    image: "/tilak.jpg",
    bio: "Manages the digital spine of Sun Beam. Directs IEMIS systems registration, manages active school parameters, coordinates the online admissions desk, and maintains cyber safety for our smart laboratories.",
    responsibilities: [
      "IEMIS government registry updates & analysis",
      "Digital student profiles & grade database management",
      "Hardware, networking, and IT security orchestration across the campus"
    ]
  }
];

// Statistics Counter Data
export const STATISTICS = [
  { value: "600+", label: "Enrolled Students", icon: "Users" },
  { value: "30+", label: "Experienced Teachers", icon: "Award" },
  { value: "25+", label: "Years of Academic Glory", icon: "Calendar" },
  { value: "100%", label: "SEE Graduation Rate", icon: "GraduationCap" },
  { value: "18+", label: "Extracurricular Clubs", icon: "Trophy" }
];

// Why Choose Us Section
export const WHY_CHOOSE_US = [
  {
    title: "Affiliation & Quality Partnership",
    description: "Our special Executive Partnership with Adarsh Ma. Vi. brings robust institutional experience, deep resources, and proven curriculum standards to our students.",
    icon: "Shield"
  },
  {
    title: "State-of-the-Art Labs & Infrastructure",
    description: "Featuring high-end computer laboratories, advanced interactive classrooms, and spacious sports arenas crafted for physical development.",
    icon: "Cpu"
  },
  {
    title: "Holistic Co-curricular Focus",
    description: "From national drama activities, debating groups, and district football championships, to cultural day celebrations, we mold versatile global minds.",
    icon: "Compass"
  },
  {
    title: "Individual Academic Care",
    description: "We maintain a student-to-teacher ratio of 20:1 in pre-primary and 25:1 in higher classes to ensure every child is noticed, heard, and supported.",
    icon: "Heart"
  }
];

// Academic Philosophy
export const VALUES = [
  {
    title: "Our Mission",
    description: "To provide equitable, inclusive, and quality education for all individuals. We foster critical thinking, innovation, and sense of social responsibility, while ensuring that every learner is empowered to contribute to the sustainable development of the nation."

  },
  {
    title: "Our Vision",
    description: "To establish Sun Beam as an elite standard for international-level education in Banke District, where modern methodologies meet humble community integration."
  },
  {
    title: "Educational Philosophy",
    description: "We embrace active child-centered learning. We guide students in 'learning by doing' so they acquire structural logic, scientific temperament, and long-term problem-solving stamina."
  }
];

// General FAQs
export const FAQS = [
  {
    question: "What are the core admission criteria for Sun Beam English Medium School?",
    answer: "Admissions depend on class capacity and prior academic track records. Applicants for Nursery to Grade 9 must sit for a localized evaluation test. Required documents include: Previous Class Pass Certificate, Date of Birth Certificate, and PP Size Photo."
  },
  {
    question: "How does the executive partnership with Adarsh Ma. Vi. benefit the students?",
    answer: "The partnership provides shared academic resources, collaborative teacher development campaigns, combined high school athletic meets, and advanced resource libraries, giving students unparalleled competitive exposure."
  },
  {
    question: "What are the school timings & daily hours?",
    answer: "The school functions from Sunday through Friday. Morning assembly starts at 9:15 AM sharp and the regular academic curtains close at 3:45 PM. The administration office remains functional from 9:00 AM to 5:00 PM."
  },
  {
    question: "Are there school transport facilities across Nepalgunj and outskirts of Banke?",
    answer: "Yes, we run a secure, tracked fleet of school buses covering major routes in Nepalgunj City, Kohalpur, Jamunaha border limits, Belaspur, and other regional sectors of Banke."
  },
  {
    question: "How are digital features integrated into classrooms?",
    answer: "We support interactive smart classrooms equipped with digital projectors and educational software. Practical classes take place at our advanced computers room managed by our resident operators."
  }
];

// Announcements / Notices
export const NOTICES: NoticeItem[] = [
  {
    id: "notice-1",
    title: "Admissions Open for Academic Session 2083",
    date: "2026-05-15",
    category: "Admission",
    content: "Online registration and paper submissions for Grades Nursery to Grade IX are active. Limited seats available. Visit our Admissions portal under 'Enroll Now' or drop by the registrar desk during office hours.",
    isImportant: true
  },
  {
    id: "notice-2",
    title: "Distribution of First Terminal Exam Report Cards",
    date: "2026-05-22",
    category: "Academic",
    content: "Report cards for the First Terminal Academic evaluations shall be disbursed this Friday. Parents must attend personally to converse with class teachers and administrative supervisors.",
    isImportant: true
  },
  {
    id: "notice-3",
    title: "Annual Inter-School Sports Carnival 2026",
    date: "2026-05-25",
    category: "Event",
    content: "We are thrilled to announce our upcoming Sports carnival, in alliance with Adarsh Ma. Vi. Events involve soccer, cricket leagues, table-tennis challenges, and short-track relays.",
    isImportant: false
  },
  {
    id: "notice-4",
    title: "Holiday Calendar: Summer Break Announcement",
    date: "2026-05-26",
    category: "Holiday",
    content: "The school will remain closed for the annual summer vacation starting Ashadh 15th to Shrawan 5th. Summer projects and home guidelines have been given directly to students.",
    isImportant: false
  }
];

// Upcoming Events
export const EVENTS: SchoolEvent[] = [
  {
    id: "event-1",
    title: "Annual STEM Exhibition 2026",
    date: "June 12, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium, Block B",
    category: "Science & Technology",
    description: "Students from Grade V to X showcase interactive physics projects, robotics circuits, and dynamic botanical setups."
  },
  {
    id: "event-2",
    title: "Parent-Teacher Convergence & Progress Review",
    date: "June 20, 2026",
    time: "9:30 AM - 1:30 PM",
    location: "Respective Classrooms",
    category: "Academic Consultation",
    description: "Detailed feedback regarding student performance, social index trackers, and customized remedial action maps."
  },
  {
    id: "event-3",
    title: "Inter-House Traditional Cultural Dance Gala",
    date: "July 04, 2026",
    time: "1:00 PM - 5:00 PM",
    location: "School Assembly Amphitheater",
    category: "Arts & Culture",
    description: "Vibrant local tharu, nepali, and maithili ethnic dances. An interactive platform to cherish the geographical marvels of Nepal."
  }
];

// Testimonials
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    author: "Mr. Rajan Chaudhary",
    role: "Parent",
    content: "Enrolling my daughter in Sun Beam was the best choice. Her improvement in analytical mathematics, public presentation, and general confidence is absolutely phenomenal. The administration under Mr. Malla is extremely proactive.",
    rating: 5,
    year: "Parent of Grade VII Student"
  },
  {
    id: "test-2",
    author: "Karuna Shrestha",
    role: "Alumni",
    content: "The values I gathered at Sun Beam Nepalgunj shaped my trajectory in Computer Science. The active guidance from the IT operators, the strict academic feedback, and the continuous push for extra-curricular tasks prepare children for university challenges.",
    rating: 5,
    year: "Batch of 2021"
  },
  {
    id: "test-3",
    author: "Aman Gupta",
    role: "Student",
    content: "I genuinely enjoy our science lab sessions and computer classes. Plus, the football events organized with Adarsh Ma. Vi. are incredible. Teachers don't just lecture, they walk with us as genuine intellectual guides.",
    rating: 5,
    year: "Current Head Boy - Grade X"
  }
];

// Gallery Images Categories mock setup
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    title: "Smart Science Laboratory Session",
    category: "Classroom Activities",
    date: "2026-04-10",
    description: "Students inspecting chemical properties using modern test assets in our new block laboratory."
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    title: "Computer Class & Coding Initiatives",
    category: "Classroom Activities",
    date: "2026-04-18",
    description: "Students training in dynamic algorithms, computer layout, and typing games guided by Tilak Kanojiya."
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    title: "Regional Football Tournament Victory",
    category: "Sports",
    date: "2026-03-24",
    description: "Sun Beam Junior Football Team lifting the District Championship cup alongside teammates from Adarsh Ma. Vi."
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&w=800&q=80",
    title: "Table Tennis Training Sessions",
    category: "Sports",
    date: "2026-03-29",
    description: "Active indoor games room setups for rapid hand-eye coordination drills during free cycles."
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80",
    title: "Traditional Dance Presentation on Annual Day",
    category: "Annual Functions",
    date: "2026-01-15",
    description: "Stellar performance displaying patriotic ethnic values, music arrays, and exquisite Nepalese dresses."
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    title: "Singing & Instrument Showcase",
    category: "Cultural Programs",
    date: "2026-02-14",
    description: "Local harmonium, tabla ensembles, and classical voice recitures during the Saraswati Puja celebrations."
  },
  {
    id: "gal-7",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    title: "Excursion to Bardia National Park",
    category: "Tours and Excursions",
    date: "2026-02-28",
    description: "An educational flora and fauna research camp for science batch, investigating preservation parameters."
  },
  {
    id: "gal-8",
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    title: "Debating Club Champions Meet",
    category: "School Events",
    date: "2026-04-05",
    description: "Active high-school panel sharing viewpoints regarding artificial intelligence and environmental ethics."
  }
];
