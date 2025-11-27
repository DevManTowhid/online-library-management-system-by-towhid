"use client";

import { useState } from "react";
import Link from "next/link";

export default function SuperAdminConsole() {
  const [activeTab, setActiveTab] = useState("team"); // 'team', 'settings', 'logs'
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data: Existing Admins
  const [admins, setAdmins] = useState([
    { id: 1, name: "Towhid (You)", email: "towhid@olms.edu", role: "MAIN_ADMIN", status: "Active", lastLogin: "Just now" },
    { id: 2, name: "Sarah Connor", email: "sarah@olms.edu", role: "NORMAL_ADMIN", status: "Active", lastLogin: "2 hrs ago" },
    { id: 3, name: "John Doe", email: "john@olms.edu", role: "NORMAL_ADMIN", status: "Locked", lastLogin: "5 days ago" },
  ]);

  // Mock Data: System Settings
  const [settings, setSettings] = useState({
    finePerDay: 50,
    maxBooksPerStudent: 3,
    issueDuration: 14,
    autoApproveReturns: false,
  });

  // Mock Data: Audit Logs
  const logs = [
    { id: 101, action: "DELETE_BOOK", user: "Sarah Connor", target: "Advanced Physics Vol 2", time: "10 mins ago" },
    { id: 102, action: "OVERRIDE_FINE", user: "Towhid", target: "Student #204", time: "2 hours ago" },
    { id: 103, action: "ADD_ADMIN", user: "Towhid", target: "John Doe", time: "5 days ago" },
  ];

  const handleRevoke = (id) => {
    setAdmins(admins.map(admin => admin.id === id ? { ...admin, status: "Revoked" } : admin));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-zinc-900 text-white border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-lg">
             <ShieldLockIcon className="w-5 h-5 text-white" />
          </div>
          <div>
             <h1 className="text-lg font-bold tracking-wide">SUPER ADMIN CONSOLE</h1>
             <p className="text-xs text-zinc-400">Restricted Access Area</p>
          </div>
        </div>
        <Link href="/admin/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
           <ArrowLeftIcon /> Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-800">
           <TabButton label="Manage Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
           <TabButton label="System Configuration" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
           <TabButton label="Security Audit Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
        </div>

        {/* --- CONTENT AREA: TEAM MANAGEMENT --- */}
        {activeTab === 'team' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Administrative Team</h2>
                   <p className="text-sm text-zinc-500">Manage who has access to the library backend.</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-purple-900/20"
                >
                  <PlusIcon /> Add New Admin
                </button>
             </div>

             <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                   <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase text-xs">
                      <tr>
                         <th className="px-6 py-4">Admin Name</th>
                         <th className="px-6 py-4">Role</th>
                         <th className="px-6 py-4">Status</th>
                         <th className="px-6 py-4">Last Login</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {admins.map((admin) => (
                         <tr key={admin.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4">
                               <div className="font-medium text-zinc-900 dark:text-white">{admin.name}</div>
                               <div className="text-zinc-500 text-xs">{admin.email}</div>
                            </td>
                            <td className="px-6 py-4">
                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  admin.role === 'MAIN_ADMIN' 
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                               }`}>
                                  {admin.role.replace('_', ' ')}
                               </span>
                            </td>
                            <td className="px-6 py-4">
                               <StatusBadge status={admin.status} />
                            </td>
                            <td className="px-6 py-4 text-zinc-500">{admin.lastLogin}</td>
                            <td className="px-6 py-4 text-right">
                               {admin.role !== 'MAIN_ADMIN' && admin.status !== 'Revoked' && (
                                  <button onClick={() => handleRevoke(admin.id)} className="text-red-600 hover:text-red-500 font-medium text-xs hover:underline">
                                     Revoke Access
                                  </button>
                               )}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- CONTENT AREA: CONFIGURATION --- */}
        {activeTab === 'settings' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Card 1: Circulation Rules */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookIcon className="text-blue-500" /> Circulation Rules
                 </h3>
                 <div className="space-y-4">
                    <SettingInput label="Max Books per Student" value={settings.maxBooksPerStudent} unit="books" />
                    <SettingInput label="Standard Issue Duration" value={settings.issueDuration} unit="days" />
                    <div className="flex items-center justify-between pt-2">
                       <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Auto-Approve Returns</label>
                       <ToggleSwitch checked={settings.autoApproveReturns} />
                    </div>
                 </div>
              </div>

              {/* Card 2: Financials */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <DollarIcon className="text-green-500" /> Financial Settings
                 </h3>
                 <div className="space-y-4">
                    <SettingInput label="Late Fine Amount (Per Day)" value={settings.finePerDay} unit="Currency Unit" />
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                       <p className="text-xs text-yellow-800 dark:text-yellow-500">
                          ⚠️ Changing the fine amount will only apply to new checkout transactions. Existing penalties remain unchanged.
                       </p>
                    </div>
                    <button className="w-full mt-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium">
                       Save Configuration
                    </button>
                 </div>
              </div>
           </div>
        )}

        {/* --- CONTENT AREA: AUDIT LOGS --- */}
        {activeTab === 'logs' && (
           <div className="bg-black/90 text-green-400 font-mono text-sm p-6 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-zinc-800">
              <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-zinc-800 pb-2">
                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                 <span>LIVE SECURITY FEED</span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                 {logs.map((log) => (
                    <div key={log.id} className="flex gap-4 hover:bg-zinc-900 p-1 rounded">
                       <span className="text-zinc-500 shrink-0">[{log.time}]</span>
                       <span className="text-purple-400 font-bold shrink-0">{log.user}</span>
                       <span className="text-white shrink-0">executed</span>
                       <span className="text-yellow-400 shrink-0">{log.action}</span>
                       <span className="text-zinc-400">on {log.target}</span>
                    </div>
                 ))}
                 <div className="text-zinc-600 mt-4 italic">-- End of current stream --</div>
              </div>
           </div>
        )}

      </main>

      {/* Add Admin Modal (Simple Overlay) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Invite New Admin</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Email Address</label>
                    <input type="email" placeholder="colleague@olms.edu" className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-800 border rounded-lg dark:border-zinc-700 outline-none focus:ring-2 focus:ring-purple-500" />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Role Level</label>
                    <select className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-800 border rounded-lg dark:border-zinc-700 outline-none">
                       <option>Normal Admin (Standard Access)</option>
                       <option>Main Admin (Super Access)</option>
                    </select>
                 </div>
                 <div className="flex gap-3 pt-4">
                    <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-800">Cancel</button>
                    <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Send Invite</button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

// --- SUB COMPONENTS ---

function TabButton({ label, active, onClick }) {
   return (
      <button 
         onClick={onClick}
         className={`pb-3 px-1 text-sm font-medium transition-all relative ${
            active 
            ? "text-purple-600 dark:text-purple-400" 
            : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
         }`}
      >
         {label}
         {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full"></div>}
      </button>
   )
}

function StatusBadge({ status }) {
   const styles = {
      Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      Locked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      Revoked: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500",
   };
   return (
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${styles[status] || styles.Revoked}`}>
         {status}
      </span>
   )
}

function SettingInput({ label, value, unit }) {
   return (
      <div className="flex flex-col gap-1">
         <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
         <div className="flex">
            <input type="number" defaultValue={value} className="w-24 p-2 bg-zinc-50 dark:bg-black border border-r-0 border-zinc-200 dark:border-zinc-800 rounded-l-lg outline-none focus:border-purple-500" />
            <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-r-lg flex items-center">
               {unit}
            </div>
         </div>
      </div>
   )
}

function ToggleSwitch({ checked }) {
   return (
      <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-purple-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
         <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
   )
}

// --- ICONS ---
const ShieldLockIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const BookIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const DollarIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;