"use client";



import { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { XIcon, CheckCircleIcon, AlertTriangleIcon, MenuIcon, LibraryIcon, HomeIcon, SearchIcon, BookOpenIcon, UserIcon, LogOutIcon, InfoIcon } from '@heroicons/react/outline';
import NavItem from "./NavItem";
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

  // State for Dark/Light Mode
  const [theme, setTheme] = useState('light');

  // Effect to auto-dismiss toast
  useEffect(() => {
      if (toastMessage) {
          const timer = setTimeout(() => {
              setToastMessage(null);
          }, 4000); // Hide after 4 seconds
          return () => clearTimeout(timer);
      }
  }, [toastMessage]);

  // Effect to load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  // --- HANDLERS ---
  const openRequestModal = (book) => {
      setSelectedBook(book);
      setShowBookModal(true);
  };

  const handleBorrowRequest = (bookId, requestType) => {
      setToastMessage(`Your **${requestType.toLowerCase()}** request was sent successfully!`);
      setToastType('success');
  };

  const handleAbsenceRequest = ({ title, author, reason }) => {
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
          <button onClick={toggleTheme} className="p-2 bg-white rounded-lg shadow-sm border dark:bg-zinc-800 dark:border-zinc-700">
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* --- VIEW: 1. OVERVIEW --- */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <AnalyticsDashboard />
          </div>
        )}

        {/* --- VIEW: 2. MY LOANS --- */}
        {activeView === 'loans' && (
           <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-xl font-bold mb-4">Current Loans ({MOCK_LOANS.length})</h2>
              <LoanTable loans={MOCK_LOANS} setToastMessage={setToastMessage} setToastType={setToastType} />
           </div>
        )}

        {/* --- VIEW: 3. SEARCH AND REQUEST --- */}
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
              <ProfileDetail label="Name" value={MOCK_USER.name} />
              <ProfileDetail label="Email" value={MOCK_USER.email} />
              <ProfileDetail label="Status" value={MOCK_USER.status} />
              <ProfileDetail label="Fines" value={`$${MOCK_USER.fines}`} highlight statusColor="red" />
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

// --- AnalyticsDashboard (New) ---
function AnalyticsDashboard() {
  const loanTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Books Borrowed',
        data: [5, 10, 15, 20, 25],
        borderColor: '#4CAF50',
        fill: false,
      },
      {
        label: 'Overdue Books',
        data: [0, 2, 3, 5, 4],
        borderColor: '#FF5733',
        fill: false,
      }
    ]
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">User Loan Trends</h3>
      <Line data={loanTrends} />
    </div>
  );
}

// --- Other Components (BookRequestModal, AbsenceRequestModal, etc.) --- 
// (The implementations for `BookRequestModal`, `Toast`, `NavItem`, etc. stay the same as previously shared)

