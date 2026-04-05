"use client";

import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-50 w-full transition-all duration-300">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm focus:outline-none" placeholder="Search bookings, guests, or listings..." type="text" />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{user?.fullName || 'Guest User'}</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{user?.role || 'Guest'}</span>
        </div>
        
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20">
          {user?.avatar ? (
            <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            user?.fullName?.charAt(0).toUpperCase() || 'U'
          )}
        </div>

        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
}
