"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin/dashboard' || path === '/business/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none";
    const activeClass = "bg-primary/10 text-primary font-bold";
    const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
      <Link href="/" className="p-6 flex items-center hover:opacity-80 transition-all">
        <div className="h-14 w-auto overflow-hidden flex-shrink-0">
          <img src="/images/image.png" className="h-full w-auto object-contain" alt="Logo" />
        </div>
        <div className="ml-2 flex flex-col justify-center border-l border-slate-200 dark:border-slate-800 pl-3">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role?.toLowerCase() === 'admin' ? 'Admin Portal' : 'Host Portal'}</p>
        </div>
      </Link>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {user?.role?.toLowerCase() === 'admin' ? (
          <>
            <Link className={getLinkClass('/admin/dashboard')} href="/admin/dashboard">
              <span className="material-symbols-outlined">analytics</span>
              <span>Admin Dashboard</span>
            </Link>
            <Link className={getLinkClass('/admin/users')} href="/admin/users">
              <span className="material-symbols-outlined">group</span>
              <span>User Management</span>
            </Link>
             <Link className={getLinkClass('/admin/listings')} href="/admin/listings">
              <span className="material-symbols-outlined">corporate_fare</span>
              <span>Listing Management</span>
            </Link>
             <Link className={getLinkClass('/admin/finance')} href="/admin/finance">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <span>Finance Management</span>
            </Link>
          </>
        ) : (
          <>
            <Link className={getLinkClass('/business/dashboard')} href="/business/dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </Link>
            <Link className={getLinkClass('/business/checkin-out')} href="/business/checkin-out">
              <span className="material-symbols-outlined">person_check</span>
              <span>Check-in/Out</span>
            </Link>
            <Link className={getLinkClass('/business/listings')} href="/business/listings">
              <span className="material-symbols-outlined">list_alt</span>
              <span>Listings</span>
            </Link>
            <Link className={getLinkClass('/business/guesthouse')} href="/business/guesthouse/1">
              <span className="material-symbols-outlined">house</span>
              <span>My Guesthouse</span>
            </Link>
            <Link className={getLinkClass('/business/payments')} href="/business/payments">
              <span className="material-symbols-outlined">payments</span>
              <span>Payments</span>
            </Link>
          </>
        )}
        <div className="pt-4 pb-2 px-4">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Support</p>
        </div>
        <Link className={getLinkClass('/business/settings')} href="/business/settings">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </Link>
        <Link className={getLinkClass('/business/help')} href="/business/help">
          <span className="material-symbols-outlined">help</span>
          <span>Help Center</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm flex-shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <span className="material-symbols-outlined text-slate-400">person</span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.fullName || 'Guest User'}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{user?.role || 'User'}</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">unfold_more</span>
        </div>
      </div>
    </aside>
  );
}
