"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// --- MOCK DATA ---
const MOCK_USER = { 
  name: "Towhid ECE", 
  id: "2024101", 
  email: "towhid@olms.edu", 
  fines: 150, 
  status: "Active" 
};

const MOCK_LOANS = [
  { id: 301, bookTitle: "Microelectronic Circuits", dueDate: "2025-12-05", daysLeft: 8, status: "Loaned" },
  { id: 302, bookTitle: "Power System Analysis", dueDate: "2025-11-20", daysLeft: -7, status: "Overdue" },
  { id: 303, bookTitle: "The Pragmatic Programmer", dueDate: "2025-12-28", daysLeft: 31, status: "Loaned" },
];

const MOCK_CATALOG = [
  { id: 1, title: "Introduction to Algorithms (4th Edition)", author: "Thomas H. Cormen", isbn: "978-0262046305", stock: 3 },
  { id: 2, title: "Microelectronic Circuits", author: "Adel S. Sedra", isbn: "978-0195323030", stock: 0 }, 
  { id: 3, title: "Clean Code: A Handbook", author: "Robert C. Martin", isbn: "978-0132350884", stock: 5 },
  { id: 4, title: "Digital Design: Verilog HDL", author: "M. Morris Mano", isbn: "978-0132774208", stock: 2 },
  { id: 5, title: "Signals and Systems", author: "Alan V. Oppenheim", isbn: "978-0138147570", stock: 1 },
];
// --- END MOCK DATA ---


export default function UserDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State for Book Request Modal
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // State for Absence Request Modal
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);

  // State for Toast Notifications
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success'); // success or error

  // Effect to auto-dismiss toast
  useEffect(() => {
      if (toastMessage) {
          const timer = setTimeout(() => {
              setToastMessage(null);
          }, 4000); // Hide after 4 seconds
          return () => clearTimeout(timer);
      }
  }, [toastMessage]);


  // --- HANDLERS ---
  const openRequestModal = (book) => {
      setSelectedBook(book);
      setShowBookModal(true);
  };

  const handleBorrowRequest = (bookId, requestType) => {
      // Simulate submission
      console.log(`[REQUEST SENT] Book ID: ${bookId}, Type: ${requestType}`);
      setToastMessage(`Your **${requestType.toLowerCase()}** request was sent successfully!`);
      setToastType('success');
  };

  const handleAbsenceRequest = ({ title, author, reason }) => {
      // Simulate submission of the absence request
      console.log(`[ABSENCE REQUEST] Title: ${title}, Author: ${author}, Reason: ${reason}`);
      setToastMessage(`**Book request submitted!** We will review your recommendation shortly.`);
      setToastType('success');
  };

  // Filter the catalog based on search query
  const filteredCatalog = MOCK_CATALOG.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );
  
  const overdueBooks = MOCK_LOANS.filter(loan => loan.status === 'Overdue');
  const dueSoonBooks = MOCK_LOANS.filter(loan => loan.daysLeft > 0 && loan.daysLeft <= 7 && loan.status === 'Loaned');

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} fixed left-0 top-0 h-full z-40 transition-all duration-300 bg-white border-r border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <LibraryIcon className="w-6 h-6" />
            {sidebarOpen && <span>Student Portal</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<HomeIcon />} label="Dashboard" active={activeView === 'overview'} onClick={() => setActiveView('overview')} isOpen={sidebarOpen} />
          {/* RENAMED TAB HERE */}
          <NavItem icon={<SearchIcon />} label="Search / Request" active={activeView === 'search'} onClick={() => setActiveView('search')} isOpen={sidebarOpen} />
          <NavItem icon={<BookOpenIcon />} label="My Loans" active={activeView === 'loans'} onClick={() => setActiveView('loans')} isOpen={sidebarOpen} />
          <div className="my-2 border-t border-zinc-100 dark:border-zinc-800"></div>
          <NavItem icon={<UserIcon />} label="Profile" active={activeView === 'profile'} onClick={() => setActiveView('profile')} isOpen={sidebarOpen} />
          <div className="flex-1"></div> {/* Spacer */}
          <Link href="/user/login" className="flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-colors">
             <LogOutIcon />
             {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} p-8`}>
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeView.replace('_', ' ')}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-white rounded-lg shadow-sm border dark:bg-zinc-800 dark:border-zinc-700">
            <MenuIcon />
          </button>
        </header>

        {/* --- VIEW: 1. OVERVIEW --- */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {/* ... Overview Content (kept same) ... */}
          </div>
        )}

        {/* --- VIEW: 2. MY LOANS --- */}
        {activeView === 'loans' && (
           <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-xl font-bold mb-4">Current Loans ({MOCK_LOANS.length})</h2>
              <LoanTable loans={MOCK_LOANS} setToastMessage={setToastMessage} setToastType={setToastType} />
           </div>
        )}

        {/* --- VIEW: 3. SEARCH AND REQUEST (UPDATED) --- */}
        {activeView === 'search' && (
           <div className="animate-in fade-in slide-in-from-bottom-2">
              <input 
                type="text" 
                placeholder="Search by Title, Author, or ISBN in our catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-indigo-500 focus:border-indigo-500" 
              />
              
              {/* Absence Request Feature */}
              <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl flex justify-between items-center">
                  <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                      Can't find the book you need?
                  </p>
                  <button 
                      onClick={() => setShowAbsenceModal(true)}
                      className="text-xs px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
                  >
                      Request New Book
                  </button>
              </div>

              {/* Search Results */}
              <h3 className="text-lg font-bold mb-3">
                 Results ({filteredCatalog.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredCatalog.length > 0 ? filteredCatalog.map(book => (
                    <BookCard key={book.id} book={book} onRequest={openRequestModal} /> 
                 )) : (
                    <p className="col-span-full text-center text-zinc-500 py-10">
                        No books found matching **"{searchQuery}"** in the catalog. Try requesting it!
                    </p>
                 )}
              </div>
           </div>
        )}

        {/* --- VIEW: 4. PROFILE --- */}
        {activeView === 'profile' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 max-w-lg">
              {/* ... Profile Content (kept same) ... */}
           </div>
        )}

      </main>

      {/* --- MODALS --- */}
      {showBookModal && selectedBook && (
          <BookRequestModal 
              book={selectedBook} 
              onClose={() => setShowBookModal(false)} 
              onBorrowRequest={handleBorrowRequest}
          />
      )}
      
      {showAbsenceModal && (
          <AbsenceRequestModal 
              onClose={() => setShowAbsenceModal(false)} 
              onRequestSubmit={handleAbsenceRequest}
          />
      )}

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}
    </div>
  );
}

// ------------------------------------------------------------------
// --- SUB COMPONENTS (NEW & MODIFIED) ---
// ------------------------------------------------------------------

// 1. TOAST NOTIFICATION COMPONENT (NEW)
function Toast({ message, type, onClose }) {
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
    const Icon = isSuccess ? CheckCircleIcon : AlertTriangleIcon;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
            <div className={`p-4 rounded-xl shadow-lg flex items-start space-x-3 text-white ${bgColor} max-w-sm`}>
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm font-medium">
                    {/* Render message allowing for bolding */}
                    <span dangerouslySetInnerHTML={{ __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
                    <XIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// 2. ABSENCE REQUEST MODAL (NEW)
function AbsenceRequestModal({ onClose, onRequestSubmit }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            onRequestSubmit({ title, author, reason });
            setIsSubmitting(false);
            onClose(); 
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl transition-all">
                
                <div className="flex justify-between items-start border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        Book Recommendation
                    </h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full transition-colors">
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Help us expand our collection! Please provide the book details.
                    </p>

                    <div>
                        <label className="block text-sm font-medium mb-1">Book Title <span className="text-red-500">*</span></label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Author / ISBN</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800" placeholder="e.g., Jane Smith or 978-..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Reason for Request (Optional)</label>
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 resize-none" placeholder="Required for course XYZ..." />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSubmitting}
                            className="py-2 px-4 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-2 px-4 rounded-lg text-sm font-bold text-white transition-colors flex items-center gap-2 ${
                                isSubmitting 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// 3. BOOK REQUEST MODAL (Kept same logic, moved up for completeness)
function BookRequestModal({ book, onClose, onBorrowRequest }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const isAvailable = book.stock > 0;
    const actionText = isAvailable ? "Confirm Borrow Request" : "Confirm Reserve Request";

    const handleRequest = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            onBorrowRequest(book.id, isAvailable ? 'BORROW' : 'RESERVE');
            setIsSubmitting(false);
            onClose(); 
        }, 1200);
    };

    // ... rest of the modal structure (kept identical)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-all">
                
                <div className="flex justify-between items-start border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {isAvailable ? 'Borrow Book' : 'Reserve Book'}
                    </h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full transition-colors">
                        <XIcon />
                    </button>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">{book.title}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">**Author:** {book.author}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">**ISBN:** {book.isbn}</p>
                    
                    <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <p className="font-bold mb-1 flex items-center gap-2">
                           <InfoIcon /> Status
                        </p>
                        <p className={`text-lg font-extrabold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {isAvailable ? `Available Stock: ${book.stock}` : 'Currently Unavailable'}
                        </p>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl text-sm">
                        <p className="font-semibold text-indigo-700 dark:text-indigo-300">
                            **Loan Policy:**
                        </p>
                        <p className="text-indigo-600 dark:text-indigo-400">
                            Maximum loan period is **14 days**.
                            {isAvailable 
                                ? ' Please pick up the book within 24 hours.' 
                                : ' You will receive a notification when the book is returned and available.'}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        disabled={isSubmitting}
                        className="py-2 px-4 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleRequest}
                        disabled={isSubmitting}
                        className={`py-2 px-4 rounded-lg text-sm font-bold text-white transition-colors flex items-center gap-2 ${
                            isSubmitting 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
}


// --- OTHER SUB COMPONENTS (DEFINITIONS KEPT SAME) ---

function NavItem({ icon, label, active, onClick, isOpen }) {
  // ... NavItem implementation (kept identical)
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
    }`}>
      <div className="w-5 h-5">{icon}</div>
      {isOpen && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
   const colors = { 
      indigo: "text-indigo-600 bg-indigo-50", 
      orange: "text-orange-600 bg-orange-50", 
      red: "text-red-600 bg-red-50" 
   };
   return (
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
         <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
         <div>
            <p className="text-xs text-zinc-500 uppercase font-semibold">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
         </div>
      </div>
   );
}

function BookCard({ book, onRequest }) { 
    const isAvailable = book.stock > 0;
    return (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            <h4 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h4>
            <p className="text-xs text-zinc-500 mb-3">By: {book.author}</p>
            
            <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {isAvailable ? `${book.stock} available` : 'Unavailable'}
                </span>
                <button 
                    onClick={() => onRequest(book)} 
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        isAvailable 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                >
                    {isAvailable ? 'Request Borrow' : 'Reserve'}
                </button>
            </div>
        </div>
    );
}

function LoanTable({ loans, setToastMessage, setToastType }) {
    const handleRenew = (title) => {
        setToastMessage(`**Renewal request** for "${title}" sent successfully!`);
        setToastType('success');
    };
    
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
                {/* ... table header ... */}
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 font-medium">
                    <tr>
                        <th className="px-6 py-3">Book Title</th>
                        <th className="px-6 py-3">Due Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {loans.map((loan) => (
                        <tr key={loan.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20">
                            <td className="px-6 py-4 font-medium">{loan.bookTitle}</td>
                            <td className="px-6 py-4">
                                <span className={loan.status === 'Overdue' ? 'text-red-500 font-bold' : 'text-zinc-600 dark:text-zinc-300'}>
                                   {loan.dueDate}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    loan.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                }`}>
                                   {loan.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                {loan.status !== 'Overdue' ? (
                                    <button onClick={() => handleRenew(loan.bookTitle)} className="text-indigo-600 hover:text-indigo-500 font-medium text-xs hover:underline">
                                        Renew
                                    </button>
                                ) : (
                                    <span className="text-red-500 text-xs font-medium">Return Required</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProfileDetail({ label, value, highlight, statusColor }) {
    // ... ProfileDetail implementation (kept identical)
    const baseClasses = "text-sm text-zinc-700 dark:text-zinc-300";
    const valueClasses = "font-medium text-zinc-900 dark:text-white";

    return (
        <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className={baseClasses}>{label}</span>
            <span className={`${valueClasses} ${highlight ? 'font-bold text-lg' : ''} ${statusColor === 'red' ? 'text-red-500' : statusColor === 'green' ? 'text-green-500' : ''}`}>
                {value}
            </span>
        </div>
    );
}


// --- ICON DEFINITIONS ---
const HomeIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SearchIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const BookOpenIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const UserIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MenuIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const LogOutIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const ClockIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const DollarIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const AlertTriangleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
const LibraryIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25m0 0V5.25M12 12.75V11.25m0 1.5v-1.5m0 1.5H9.75m2.25 0H14.25M12 2.25h.007V2.25h-.007M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" /></svg>;
const XIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const InfoIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const CheckCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;