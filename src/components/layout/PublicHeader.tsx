"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function PublicHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Discovery", href: "/discovery" },
    { name: "Features", href: "/#features" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="h-12 w-auto overflow-hidden">
            <img src="/images/image.png" className="h-full w-auto object-contain" alt="Logo" />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              {(user.role?.toLowerCase() === 'partner' || user.role?.toLowerCase() === 'admin') && (
                <Link 
                  href={user.role?.toLowerCase() === 'admin' ? "/admin/dashboard" : "/business/dashboard"}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-all border border-primary/20"
                >
                  <span className="material-symbols-outlined text-sm">Dashboard</span>
                  <span className="text-sm font-bold">Dashboard</span>
                </Link>
              )}

              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{user.fullName || user.email}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role || 'Guest'}</span>
                  </div>
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden ring-offset-2 ring-primary/20 transition-all focus:ring-2">
                    {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : (user.fullName?.charAt(0) || 'U')}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 py-2 z-[100] animate-in fade-in zoom-in duration-100">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 sm:hidden">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.fullName || user.email}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role || 'Guest'}</p>
                    </div>

                    <Link 
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg opacity-70">person</span>
                      <span>View Profile</span>
                    </Link>

                    <Link 
                      href="/my-bookings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg opacity-70">calendar_month</span>
                      <span>My Bookings</span>
                    </Link>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg opacity-70">logout</span>
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="flex px-6 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
