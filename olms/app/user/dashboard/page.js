"use client";

import { useState } from "react";
import Link from "next/link";

// Mock User Data & State Setup
const MOCK_USER = { 
  name: "Towhid ECE", 
  id: "2024101", 
  email: "towhid@olms.edu", 
  fines: 150, // Mock currency unit
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


export default function UserDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter the catalog based on search query
  const filteredCatalog = MOCK_CATALOG.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Find overdue books
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
          <NavItem icon={<SearchIcon />} label="Search Catalog" active={activeView === 'search'} onClick={() => setActiveView('search')} isOpen={sidebarOpen} />
          <NavItem icon={<BookOpenIcon />} label="My Loans" active={activeView === 'loans'} onClick={() => setActiveView('loans')} isOpen={sidebarOpen} />
          <div className="my-2 border-t border-zinc-100 dark:border-zinc-800"></div>
          <NavItem icon={<UserIcon />} label="Profile" active={activeView === 'profile'} onClick={() => setActiveView('profile')} isOpen={sidebarOpen} />
          <Link href="/user/login" className="flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-colors mt-auto">
             <LogOutIcon />
             {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} p-8`}>
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeView.replace('_', ' ')}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-white rounded-lg shadow-sm border dark:bg-zinc-800 dark:border-zinc-700">
            <MenuIcon />
          </button>
        </header>

        {/* --- VIEW: 1. OVERVIEW --- */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <StatCard title="Books Currently Borrowed" value={MOCK_LOANS.length} icon={<BookOpenIcon />} color="indigo" />
               <StatCard title="Overdue Books" value={overdueBooks.length} icon={<ClockIcon />} color="red" />
               <StatCard title="Current Fines" value={`${MOCK_USER.fines} Unit`} icon={<DollarIcon />} color="orange" />
            </div>
            
            {/* Alerts Section */}
            {(overdueBooks.length > 0 || dueSoonBooks.length > 0) && (
              <div className="bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 p-4 rounded-xl">
                 <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertTriangleIcon /> Important Alerts
                 </h3>
                 <ul className="list-disc ml-5 text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                    {overdueBooks.map(loan => (
                      <li key={loan.id} className="font-bold">🚨 "{loan.bookTitle}" is **Overdue** by 7 days. Please return immediately!</li>
                    ))}
                    {dueSoonBooks.map(loan => (
                      <li key={loan.id}>⏳ "{loan.bookTitle}" is due in {loan.daysLeft} days.</li>
                    ))}
                 </ul>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
               <h3 className="font-semibold mb-4">Quick Links</h3>
               <div className="flex gap-4">
                  <button onClick={() => setActiveView('search')} className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200 transition-colors">Browse New Books</button>
                  <button onClick={() => setActiveView('loans')} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm hover:bg-zinc-200 transition-colors">Manage Loans</button>
               </div>
            </div>
          </div>
        )}

        {/* --- VIEW: 2. MY LOANS --- */}
        {activeView === 'loans' && (
           <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-xl font-bold mb-4">Current Loans ({MOCK_LOANS.length})</h2>
              <LoanTable loans={MOCK_LOANS} />
           </div>
        )}

        {/* --- VIEW: 3. SEARCH CATALOG --- */}
        {activeView === 'search' && (
           <div className="animate-in fade-in slide-in-from-bottom-2">
              <input 
                type="text" 
                placeholder="Search by Title, Author, or ISBN..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-indigo-500 focus:border-indigo-500" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredCatalog.map(book => (
                    <BookCard key={book.id} book={book} />
                 ))}
                 {filteredCatalog.length === 0 && (
                     <p className="col-span-3 text-center text-zinc-500">No books found matching "{searchQuery}"</p>
                 )}
              </div>
           </div>
        )}

        {/* --- VIEW: 4. PROFILE --- */}
        {activeView === 'profile' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 max-w-lg">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                 <h2 className="text-xl font-bold mb-6 border-b pb-2">My Profile Details</h2>
                 <div className="space-y-4">
                    <ProfileDetail label="Name" value={MOCK_USER.name} />
                    <ProfileDetail label="Student ID" value={MOCK_USER.id} highlight />
                    <ProfileDetail label="Email" value={MOCK_USER.email} />
                    <ProfileDetail label="Library Status" value={MOCK_USER.status} statusColor={MOCK_USER.status === 'Active' ? 'green' : 'red'} />
                 </div>
                 <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                    <button className="text-sm px-4 py-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Change Password</button>
                    <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Update Profile</button>
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
}

// --- SUB COMPONENTS & ICONS ---

function NavItem({ icon, label, active, onClick, isOpen }) {
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

function BookCard({ book }) {
    const isAvailable = book.stock > 0;
    return (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-shadow hover:shadow-md">
            <h4 className="font-bold text-lg mb-1">{book.title}</h4>
            <p className="text-xs text-zinc-500 mb-3">By: {book.author}</p>
            
            <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {isAvailable ? `${book.stock} available` : 'Unavailable'}
                </span>
                <button 
                    disabled={!isAvailable}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        isAvailable 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
                    }`}
                >
                    {isAvailable ? 'Request Borrow' : 'Reserve'}
                </button>
            </div>
        </div>
    );
}

function LoanTable({ loans }) {
    const handleRenew = (title) => {
        alert(`Requesting renewal for: ${title}`);
    };
    
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
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


// --- ICONS ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
const LibraryIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25m0 0V5.25M12 12.75V11.25m0 1.5v-1.5m0 1.5H9.75m2.25 0H14.25M12 2.25h.007V2.25h-.007M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
    </svg>
);