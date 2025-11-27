"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
            
            // Basic validation
            if (loginId && password) {
                console.log(`Attempting login for ID: ${loginId}`);
                
                // Assuming successful login redirects to the main user dashboard (to be built later)
                // We'll use a new path for the user dashboard here: /user/dashboard
                router.push('/user/dashboard'); 
            } else {
                alert("Please enter both ID/Email and Password.");
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
            
            {/* Background Blob Decoration (Modern/Glassmorphism feel) */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob dark:opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 dark:opacity-30"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                    
                    {/* Header/Branding */}
                    <div className="text-center mb-8">
                        <LibraryIcon className="mx-auto w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
                        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            User Portal Login 📚
                        </h2>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Access your book list and requests.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Login ID / Email */}
                        <div>
                            <label htmlFor="loginId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                **Email**
                            </label>
                            <input
                                id="loginId"
                                name="loginId"
                                type="text"
                                required
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="e.g., 2024101 or student@university.edu"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                **Password**
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white transition-all duration-200 ${
                                    isLoading 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-900'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent border-opacity-75 rounded-full animate-spin"></div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                    
                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Don't have an account? 
                            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 ml-1">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Tailwind Keyframes for background animation (must be in globals.css or linked style) */}
            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

// Icon for branding
const LibraryIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25m0 0V5.25M12 12.75V11.25m0 1.5v-1.5m0 1.5H9.75m2.25 0H14.25M12 2.25h.007V2.25h-.007M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
    </svg>
);