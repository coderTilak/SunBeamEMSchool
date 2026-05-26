import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { GalleryPhoto, AppointmentSubmission, EnrollmentSubmission } from '../types';
import {
  CalendarDays,
  CheckCircle,
  ImagePlus,
  Inbox,
  Lock,
  Mail,
  ShieldCheck,
  Upload,
  UserCheck,
  XCircle,
} from 'lucide-react';

const galleryCategories = [
  'School Events',
  'Sports',
  'Cultural Programs',
  'Classroom Activities',
  'Annual Functions',
  'Tours and Excursions',
] as const;

type AdminTab = 'dashboard' | 'gallery' | 'messages';

type MessageRecord = {
  id: string;
  [key: string]: any;
};

export default function AdminPortal() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<typeof galleryCategories[number]>('School Events');
  const [galleryDate, setGalleryDate] = useState('');
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  const [galleryItems, setGalleryItems] = useState<GalleryPhoto[]>([]);
  const [contactMessages, setContactMessages] = useState<MessageRecord[]>([]);
  const [appointmentMessages, setAppointmentMessages] = useState<MessageRecord[]>([]);
  const [enrollmentMessages, setEnrollmentMessages] = useState<MessageRecord[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const contactQuery = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const appointmentQuery = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const enrollmentQuery = query(collection(db, 'enrollments'), orderBy('createdAt', 'desc'));
    const galleryQuery = query(collection(db, 'galleryPhotos'), orderBy('createdAt', 'desc'));

    const unsubscribeContact = onSnapshot(contactQuery, (snapshot) => {
      setContactMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) })));
    });
    const unsubscribeAppointment = onSnapshot(appointmentQuery, (snapshot) => {
      setAppointmentMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) })));
    });
    const unsubscribeEnrollment = onSnapshot(enrollmentQuery, (snapshot) => {
      setEnrollmentMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) })));
    });
    const unsubscribeGallery = onSnapshot(galleryQuery, (snapshot) => {
      setGalleryItems(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) })));
    });

    return () => {
      unsubscribeContact();
      unsubscribeAppointment();
      unsubscribeEnrollment();
      unsubscribeGallery();
    };
  }, [currentUser]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setActiveTab('dashboard');
    } catch (error: unknown) {
      console.error('Firebase signIn error:', error);
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Unable to sign in. Check credentials and try again.');
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setActiveTab('dashboard');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setGalleryFile(file);
  };

  const handleUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadSuccess('');
    setUploadError('');

    if (!galleryFile) {
      setUploadError('Select an image file before uploading.');
      return;
    }
    if (!galleryTitle.trim() || !galleryDate.trim()) {
      setUploadError('Provide both a title and a date.');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}-${galleryFile.name}`);
      const uploadResult = await uploadBytes(storageRef, galleryFile);
      const url = await getDownloadURL(uploadResult.ref);

      const docRef = await addDoc(collection(db, 'galleryPhotos'), {
        title: galleryTitle.trim(),
        category: galleryCategory,
        date: galleryDate,
        description: galleryDescription.trim(),
        url,
        createdAt: serverTimestamp(),
      });

      const newGalleryItem: GalleryPhoto = {
        id: docRef.id,
        title: galleryTitle.trim(),
        category: galleryCategory,
        date: galleryDate,
        description: galleryDescription.trim(),
        url,
      };
      setGalleryItems((prev) => [newGalleryItem, ...prev.filter((item) => item.id !== docRef.id)]);

      setUploadSuccess('Photo uploaded and saved to the gallery successfully.');
      setGalleryTitle('');
      setGalleryCategory('School Events');
      setGalleryDate('');
      setGalleryDescription('');
      setGalleryFile(null);
    } catch (error: unknown) {
      console.error('Gallery upload failed:', error);
      const message = error instanceof Error ? error.message : 'Upload failed. Please try again.';
      setUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="py-20 px-4 text-center text-blue-900">
        <p className="text-xl font-bold">Loading admin portal…</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="mb-8 text-center">
              <ShieldCheck className="mx-auto mb-4 w-12 h-12 text-blue-600" />
              <h1 className="text-3xl font-extrabold text-blue-950 mb-2">Admin Portal Sign In</h1>
              <p className="text-sm text-gray-500">Sign in with your Firebase administrator account to manage gallery uploads and incoming submissions.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="admin@example.com"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Your admin password"
                />
              </label>
              {authError && <p className="text-sm text-red-600">{authError}</p>}
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <Lock className="w-4 h-4" />
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-blue-600 font-bold">Admin Portal</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-950">Website Management Dashboard</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 max-w-2xl">
              View all incoming messages and upload gallery assets directly to Firebase Storage. Messages are stored in Firestore collections for contact, appointment, and enrollment submissions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <XCircle className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-6">
          <aside className="space-y-4 rounded-3xl bg-white border border-gray-200 p-5 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-sm uppercase tracking-[0.32em] text-slate-400">Sections</h2>
              {(['dashboard', 'gallery', 'messages'] as AdminTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'dashboard' ? 'Dashboard' : tab === 'gallery' ? 'Gallery Upload' : 'Submissions'}
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-3">Quick stats</p>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                  <span>Contact</span>
                  <strong>{contactMessages.length}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Appointments</span>
                  <strong>{appointmentMessages.length}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Enrollments</span>
                  <strong>{enrollmentMessages.length}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Gallery Assets</span>
                  <strong>{galleryItems.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {[
                    { label: 'Contact Messages', value: contactMessages.length },
                    { label: 'Appointments', value: appointmentMessages.length },
                    { label: 'Enrollments', value: enrollmentMessages.length },
                    { label: 'Gallery Items', value: galleryItems.length },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-bold">{stat.label}</p>
                      <p className="mt-4 text-4xl font-extrabold text-slate-950">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Latest Messages</h2>
                      <p className="text-sm text-slate-500">Review the most recent incoming entries from all collections.</p>
                    </div>
                    <Inbox className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Contact</h3>
                      {contactMessages.slice(0, 3).map((item) => (
                        <div key={item.id} className="space-y-1 mb-3 last:mb-0">
                          <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.subject || 'No subject'}</p>
                          <p className="text-xs text-slate-400">{item.email || 'No email'}</p>
                        </div>
                      ))}
                      {contactMessages.length === 0 && <p className="text-xs text-slate-500">No contact messages yet.</p>}
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Appointments</h3>
                      {appointmentMessages.slice(0, 3).map((item) => (
                        <div key={item.id} className="space-y-1 mb-3 last:mb-0">
                          <p className="text-sm font-semibold text-slate-800">{item.parentName}</p>
                          <p className="text-xs text-slate-500">{item.phoneNumber}</p>
                          <p className="text-xs text-slate-400">{item.date}</p>
                        </div>
                      ))}
                      {appointmentMessages.length === 0 && <p className="text-xs text-slate-500">No appointments yet.</p>}
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Enrollments</h3>
                      {enrollmentMessages.slice(0, 3).map((item) => (
                        <div key={item.id} className="space-y-1 mb-3 last:mb-0">
                          <p className="text-sm font-semibold text-slate-800">{item.studentName}</p>
                          <p className="text-xs text-slate-500">{item.contactNumber}</p>
                          <p className="text-xs text-slate-400">{item.gradeApplying}</p>
                        </div>
                      ))}
                      {enrollmentMessages.length === 0 && <p className="text-xs text-slate-500">No enrollments yet.</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Upload Gallery Photo</h2>
                      <p className="text-sm text-slate-500">Store a new photo in Firebase Storage and publish it to the gallery collection.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
                      <Upload className="w-4 h-4 text-blue-600" />
                      Upload asset
                    </div>
                  </div>
                  <form onSubmit={handleUploadSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                      Title
                      <input
                        value={galleryTitle}
                        onChange={(event) => setGalleryTitle(event.target.value)}
                        placeholder="Photo title"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                      Category
                      <select
                        value={galleryCategory}
                        onChange={(event) => setGalleryCategory(event.target.value as typeof galleryCategories[number])}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >
                        {galleryCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                      Date
                      <input
                        type="date"
                        value={galleryDate}
                        onChange={(event) => setGalleryDate(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                      Description
                      <textarea
                        value={galleryDescription}
                        onChange={(event) => setGalleryDescription(event.target.value)}
                        rows={4}
                        placeholder="Add a short caption or details"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                      Photo file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-slate-700 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700"
                      />
                    </label>
                    <div className="sm:col-span-2 flex flex-col gap-3">
                      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
                      {uploadSuccess && <p className="text-sm text-emerald-600">{uploadSuccess}</p>}
                      <button
                        type="submit"
                        disabled={uploading}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                      >
                        <ImagePlus className="w-4 h-4" />
                        {uploading ? 'Uploading…' : 'Upload Photo'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950">Current Gallery Items</h2>
                      <p className="text-sm text-slate-500">Latest photos saved in Firebase.</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      {galleryItems.length} items
                    </span>
                  </div>
                  {galleryItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {galleryItems.slice(0, 6).map((item) => (
                        <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.category} • {item.date}</p>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No gallery items uploaded yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                {[
                  { title: 'Contact Us Messages', items: contactMessages, icon: Mail },
                  { title: 'Appointment Requests', items: appointmentMessages, icon: CalendarDays },
                  { title: 'Enrollment Submissions', items: enrollmentMessages, icon: UserCheck },
                ].map((section) => (
                  <div key={section.title} className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
                        <p className="text-sm text-slate-500">Most recent entries appear first.</p>
                      </div>
                      <section.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    {section.items.length > 0 ? (
                      <div className="space-y-4">
                        {section.items.map((message) => (
                          <div key={message.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-900">{message.name || message.parentName || message.studentName || 'No name'}</p>
                              <span className="text-xs text-slate-500">{new Date(message.createdAt?.seconds ? message.createdAt.seconds * 1000 : Date.now()).toLocaleString()}</span>
                            </div>
                            <div className="mt-2 text-sm text-slate-600 space-y-1">
                              {message.email && <p><strong>Email:</strong> {message.email}</p>}
                              {message.phoneNumber && <p><strong>Phone:</strong> {message.phoneNumber}</p>}
                              {message.gradeApplying && <p><strong>Grade:</strong> {message.gradeApplying}</p>}
                              {message.subject && <p><strong>Subject:</strong> {message.subject}</p>}
                              {message.message && <p><strong>Message:</strong> {message.message}</p>}
                              {message.address && <p><strong>Address:</strong> {message.address}</p>}
                              {message.permanentAddress && <p><strong>Permanent Address:</strong> {message.permanentAddress}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No submissions found yet.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
