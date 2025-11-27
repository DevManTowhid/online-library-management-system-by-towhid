"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  
  // SIMULATED STATE: Change this to 'NORMAL' to test the restricted view
  const [adminRole, setAdminRole] = useState("MAIN_ADMIN"); // Options: 'MAIN_ADMIN' or 'NORMAL'
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Mock Data for "Messy" Requests
  const rawRequests = [
    "harry potter 1", "Harry Potter and the Sorcerer's Stone", "hp 1 rowling",
    "clean code uncle bob", "Clean Code",
    "intro to algos", "Introduction to Algorithms CLRS"
  ];

  // The AI "Normalization" Logic (Simulated)
  const handleAiProcess = () => {
    setIsAiProcessing(true);
    setAiResult(null);
    
    // Simulate AI Latency
    setTimeout(() => {
      setAiResult([
        { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", count: 3, probability: "98%" },
        { title: "Clean Code", author: "Robert C. Martin", count: 2, probability: "99%" },
        { title: "Introduction to Algorithms", author: "Thomas H. Cormen", count: 2, probability: "95%" },
      ]);
      setIsAiProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} fixed left-0 top-0 h-full z-40 transition-all duration-300 bg-white border-r border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 flex flex-col`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">OL</div>
            {sidebarOpen && <span className="animate-in fade-in">MS Admin</span>}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem icon={<HomeIcon />} label="Dashboard" isOpen={sidebarOpen} active />
          <NavItem icon={<BookIcon />} label="Book Management" isOpen={sidebarOpen} />
          <NavItem icon={<UsersIcon />} label="Transactions" isOpen={sidebarOpen} />
          <NavItem icon={<SparklesIcon />} label="AI Requests" isOpen={sidebarOpen} highlight />
          
          <div className="my-4 border-t border-zinc-100 dark:border-zinc-800"></div>
          
          {/* Main Admin Only Links */}
          {adminRole === 'MAIN_ADMIN' && (
             <div className="space-y-2">
                {sidebarOpen && <p className="text-xs font-semibold text-zinc-400 px-2 uppercase">Super Admin</p>}
                <NavItem icon={<ShieldIcon />} label="Manage Admins" isOpen={sidebarOpen} />
                <NavItem icon={<SettingsIcon />} label="System Config" isOpen={sidebarOpen} />
             </div>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
           <button onClick={() => router.push('/admin/login')} className="flex items-center gap-3 text-zinc-500 hover:text-red-600 transition-colors w-full">
             <LogOutIcon />
             {sidebarOpen && <span>Logout</span>}
           </button>
        </div>
      </aside>


      {/* --- MAIN CONTENT --- */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} p-8`}>
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-zinc-500 text-sm">Welcome back, {adminRole === 'MAIN_ADMIN' ? 'Main Administrator' : 'Librarian'}</p>
          </div>
          <div className="flex items-center gap-4">
             {/* Role Badge */}
             <span className={`px-3 py-1 rounded-full text-xs font-medium border ${adminRole === 'MAIN_ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                {adminRole === 'MAIN_ADMIN' ? 'SUPER ADMIN' : 'STAFF'}
             </span>
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-white rounded-lg shadow-sm border dark:bg-zinc-800 dark:border-zinc-700">
                <MenuIcon />
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Books" value="12,450" change="+12" icon={<BookIcon />} color="blue" />
          <StatCard title="Active Borrows" value="843" change="+5" icon={<UsersIcon />} color="green" />
          <StatCard title="Pending Returns" value="24" change="-2" icon={<ClockIcon />} color="orange" />
          <StatCard title="Book Requests" value="158" change="+34" icon={<FlagIcon />} color="red" />
        </div>

        {/* --- AI REQUEST PROCESSOR SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: AI Processor Tool */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                {/* Decorative BG for AI */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-white">
                          <SparklesIcon className="text-indigo-500" /> 
                          AI Request Normalizer
                        </h2>
                        <p className="text-sm text-zinc-500 mt-1">
                          The AI analyzes different spelling variations in user requests and compiles a standardized procurement list.
                        </p>
                      </div>
                      <button 
                        onClick={handleAiProcess}
                        disabled={isAiProcessing}
                        className="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isAiProcessing ? 'Processing...' : 'Run AI Analysis'}
                      </button>
                   </div>

                   {/* Before Processing (Visualizing the mess) */}
                   {!aiResult && !isAiProcessing && (
                      <div className="bg-zinc-50 dark:bg-black/20 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-medium text-zinc-400 uppercase mb-3">Incoming Raw Requests Sample</p>
                        <div className="flex flex-wrap gap-2">
                           {rawRequests.map((req, i) => (
                             <span key={i} className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs text-zinc-600 dark:text-zinc-300">
                               "{req}"
                             </span>
                           ))}
                           <span className="text-xs text-zinc-400 self-center">+ 142 more</span>
                        </div>
                      </div>
                   )}

                   {/* Processing State */}
                   {isAiProcessing && (
                      <div className="h-40 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-indigo-600 font-medium animate-pulse">Normalizing titles and merging duplicates...</p>
                      </div>
                   )}

                   {/* After Processing (The Result) */}
                   {aiResult && (
                      <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <table className="w-full text-sm text-left">
                           <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
                             <tr>
                               <th className="px-4 py-3 rounded-l-lg">Standardized Title</th>
                               <th className="px-4 py-3">Author</th>
                               <th className="px-4 py-3 text-center">Requests</th>
                               <th className="px-4 py-3 rounded-r-lg text-right">Confidence</th>
                             </tr>
                           </thead>
                           <tbody>
                             {aiResult.map((item, idx) => (
                               <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                 <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{item.title}</td>
                                 <td className="px-4 py-3 text-zinc-500">{item.author}</td>
                                 <td className="px-4 py-3 text-center">
                                   <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">{item.count}</span>
                                 </td>
                                 <td className="px-4 py-3 text-right text-green-600 font-medium">{item.probability}</td>
                               </tr>
                             ))}
                           </tbody>
                        </table>
                        <div className="mt-4 flex justify-end">
                           <button className="text-sm text-indigo-600 hover:underline">Add these books to Procurement List &rarr;</button>
                        </div>
                      </div>
                   )}
                </div>
             </div>
             
             {/* Transaction Monitor */}
             <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                   {[1, 2, 3].map((_, i) => (
                     <div key={i} className="flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                           <div>
                              <p className="text-sm font-medium text-zinc-900 dark:text-white">Design Patterns: Elements</p>
                              <p className="text-xs text-zinc-500">Borrowed by User #2024{i}9</p>
                           </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">2 mins ago</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Quick Actions & Admin Management */}
          <div className="space-y-6">
            
            {/* Super Admin Panel */}
            {adminRole === 'MAIN_ADMIN' && (
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-black rounded-3xl p-6 text-white shadow-lg">
                 <div className="flex items-center gap-3 mb-4">
                    <ShieldIcon className="text-yellow-400" />
                    <h3 className="font-semibold">Main Admin Control</h3>
                 </div>
                 <p className="text-zinc-400 text-sm mb-6">You have root privileges to manage the administrative team.</p>
                 
                 <button className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors mb-2">
                    Add New Admin
                 </button>
                 <button className="w-full py-3 bg-transparent border border-zinc-600 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
                    View Audit Logs
                 </button>
              </div>
            )}

            {/* Quick Tasks (For Normal & Main Admin) */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
               <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  <ActionButton icon={<PlusIcon />} label="Add Book" color="blue" />
                  <ActionButton icon={<ArrowLeftRightIcon />} label="Returns" color="orange" />
                  <ActionButton icon={<CheckCircleIcon />} label="Approvals" color="green" />
                  <ActionButton icon={<BellIcon />} label="Alerts" color="red" />
               </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

// --- SUB COMPONENTS (For Cleanliness) ---

function NavItem({ icon, label, isOpen, active, highlight }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
    } ${highlight ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : ''}`}>
      <div className="w-5 h-5">{icon}</div>
      {isOpen && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </div>
  );
}

function StatCard({ title, value, change, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
           <div className="w-6 h-6">{icon}</div>
        </div>
        <span className={`text-xs font-bold ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{change}%</span>
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</h3>
      <p className="text-sm text-zinc-500">{title}</p>
    </div>
  );
}

function ActionButton({ icon, label, color }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 transition-all hover:-translate-y-1">
       <div className={`w-6 h-6 mb-2 text-${color}-500`}>{icon}</div>
       <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{label}</span>
    </button>
  );
}

// --- ICONS (Standard SVGs to avoid install errors) ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const FlagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const SparklesIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 7h4"/><path d="M3 5h4"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const ArrowLeftRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;