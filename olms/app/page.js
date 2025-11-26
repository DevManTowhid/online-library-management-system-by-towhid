import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 selection:bg-indigo-500 selection:text-white">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <main className="z-10 flex w-full max-w-5xl flex-col items-center gap-12 px-6 py-12 text-center md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative flex items-center justify-center p-4 rounded-2xl bg-white/50 shadow-xl backdrop-blur-sm border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800">
             {/* You can replace this with your actual logo file */}
            <div className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              OLMS
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Welcome to the <br />
            <span className="text-indigo-600 dark:text-indigo-400">Management System</span>
          </h1>
          
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Streamline your workflow with our intelligent platform. 
            Please select your role to continue to the dashboard.
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 max-w-3xl mt-4">
          
          {/* Admin Card */}
          <div className="group relative flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-red-900/20 dark:to-orange-900/20"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {/* Admin Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Administrator</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Access system settings, user management, and reports.</p>
            </div>

            <Link 
              href="/admin/login" 
              className="relative z-10 mt-8 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Login as Admin
            </Link>
          </div>

          {/* User Card */}
          <div className="group relative flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-indigo-900/20 dark:to-blue-900/20"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                {/* User Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Authorized User</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Access your dashboard, submit requests, and view data.</p>
            </div>

            <Link 
              href="/user/login" 
              className="relative z-10 mt-8 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Continue as User
            </Link>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-8">
          © {new Date().getFullYear()} OLMS System. Secure Access Required.
        </p>

      </main>
    </div>
  );
}