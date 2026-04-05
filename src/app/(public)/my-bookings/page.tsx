"use client";

import { useEffect, useState } from "react";
import { BookingService } from "@/services/booking.service";
import { Booking } from "@/types/api";
import { format } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const data = await BookingService.getMyBookings();
      setBookings(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 animate-pulse">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950/20 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">My Bookings</h1>
            <p className="text-slate-500 mt-1">Manage your stays and view your history</p>
          </div>
          
          <Link 
            href="/discovery" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>New Booking</span>
          </Link>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && bookings.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <span className="material-symbols-outlined text-5xl">calendar_today</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No bookings found</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven't made any bookings yet. Start exploring properties to find your next stay!</p>
            <Link 
              href="/discovery" 
              className="text-primary font-bold hover:underline"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail */}
                  <div className="relative w-full lg:w-72 h-48 lg:h-auto overflow-hidden">
                    <img 
                      src={booking.roomImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"} 
                      alt={booking.roomName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute top-4 left-4 flex px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {booking.roomName}
                          </h3>
                          <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                            <span className="material-symbols-outlined text-lg">tag</span>
                            ID: #{booking.id.toString().padStart(6, '0')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500 font-medium">Total Amount</p>
                          <p className="text-2xl font-black text-primary">
                            {(booking.totalPrice || 0).toLocaleString("vi-VN")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Check-in</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 border-l border-slate-200 dark:border-slate-700 pl-6">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Check-out</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 border-l border-slate-200 dark:border-slate-700 pl-6">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nights</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {booking.nights}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 border-l border-slate-200 dark:border-slate-700 pl-6">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Booking Date</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {booking.createdAt ? format(new Date(booking.createdAt), 'MMM dd, yyyy') : '--'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        {booking.status.toLowerCase() === 'pending' && (
                          <Link 
                            href={`/booking/payment?id=${booking.id}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">payment</span>
                            Complete Payment
                          </Link>
                        )}
                        <Link 
                          href={`/discovery?room=${booking.roomId}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">info</span>
                          View Property
                        </Link>
                      </div>
                      
                      {booking.status.toLowerCase() === 'pending' && (
                        <button 
                          className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                          onClick={() => {/* Implement cancel if needed */}}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
