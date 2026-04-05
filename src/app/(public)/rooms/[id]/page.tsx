"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Room, CreateBookingRequest } from '@/types/api';
import { RoomService } from '@/services/room.service';
import { BookingService } from '@/services/booking.service';

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const data = await RoomService.getRoomById(parseInt(id));
      setRoom(data);
    } catch (err) {
      console.error("Failed to fetch room:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to book a room!");
      window.location.href = '/login';
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates!");
      return;
    }

    const { checkIn, checkOut, guests } = bookingData;
    window.location.href = `/booking/payment?roomId=${room!.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (!room) return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold"><span className="material-symbols-outlined text-6xl mb-4">error</span>Room not found!</div>;

  const totalNights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const formatPrice = (price?: number) => {
    return (price || 0).toLocaleString("vi-VN") + "";
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{room.name}</h1>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">star</span> {room.rating || 4.5}</div>
                <div className="flex items-center gap-1 underline underline-offset-4 decoration-2 decoration-primary/30">{room.fullAddress || room.propertyLocation}</div>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-lg">share</span> Share
             </button>
             <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-lg">favorite</span> Save
             </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[300px] md:h-[500px] gap-3 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-indigo-500/10">
           <div className="md:col-span-2 md:row-span-2 overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" src={room.mainImageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"} alt={room.name} />
           </div>
           {Array.from({ length: 4 }).map((_, i) => {
             const dbUrl = room.imageUrls && room.imageUrls[i+1] ? room.imageUrls[i+1] : null;
             const fallbackUrl = `https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80&sig=${i}`;
             return (
              <div key={i} className="hidden md:block overflow-hidden group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-200 dark:bg-slate-800" src={dbUrl || fallbackUrl} alt={`Gallery ${i}`} />
              </div>
             );
           })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-8 items-center py-8 border-b border-slate-100 dark:border-slate-800 mb-8">
                 <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{room.capacity} Guests</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-primary text-3xl">king_bed</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{room.bedCount || 1} Beds</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-primary text-3xl">square_foot</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{room.area || 0} m²</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-primary text-3xl">meeting_room</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{room.roomType || 'Standard'}</span>
                 </div>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-12">
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">About this space</h2>
                 <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    {room.description || "No description provided for this room."}
                 </p>
                 
                 {room.propertyDescription && (
                    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Property Highlights</h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium italic">"{room.propertyDescription}"</p>
                    </div>
                 )}
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-8 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-3xl">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room ID</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">#{room.id}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Code</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{room.roomCode}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listed Date</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{room.createdAt ? new Date(room.createdAt).toLocaleDateString() : "N/A"}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                      <span className={`text-xs font-black uppercase px-2 py-1 rounded-lg w-fit ${room.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                         {room.isApproved ? 'Approved' : 'Pending'}
                      </span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Property</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{room.propertyName || "N/A"}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Updated</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{room.updatedAt ? new Date(room.updatedAt).toLocaleDateString() : "Never"}</span>
                   </div>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-12">
                 <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="material-symbols-outlined text-primary">wifi</span> High-speed WiFi
                 </div>
                 <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="material-symbols-outlined text-primary">ac_unit</span> Air conditioning
                 </div>
                 <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="material-symbols-outlined text-primary">coffee_maker</span> Coffee maker
                 </div>
                 <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="material-symbols-outlined text-primary">tv</span> Smart TV
                 </div>
              </div>
           </div>

           {/* Booking Sidebar */}
           <div className="relative">
              <div className="sticky top-28 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <span className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(room.basePrice)}</span>
                       <span className="text-slate-500 font-bold"> / night</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-widest underline decoration-primary/50">
                       <span className="material-symbols-outlined text-xs text-primary">star</span> {room.rating || 4.5} · Reviews
                    </div>
                 </div>

                 <form onSubmit={handleBooking} className="space-y-4">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-700">
                       <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
                          <div className="p-3">
                             <label className="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Check-in</label>
                             <input type="date" required className="block w-full bg-transparent text-sm font-bold focus:outline-none" value={bookingData.checkIn} onChange={e => setBookingData({...bookingData, checkIn: e.target.value})} />
                          </div>
                          <div className="p-3">
                             <label className="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Check-out</label>
                             <input type="date" required className="block w-full bg-transparent text-sm font-bold focus:outline-none" value={bookingData.checkOut} onChange={e => setBookingData({...bookingData, checkOut: e.target.value})} />
                          </div>
                       </div>
                       <div className="p-3">
                          <label className="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Guests</label>
                          <select className="block w-full bg-transparent text-sm font-bold focus:outline-none" value={bookingData.guests} onChange={e => setBookingData({...bookingData, guests: parseInt(e.target.value)})}>
                             {Array.from({length: room.capacity}).map((_, i) => <option key={i} value={i+1}>{i+1} guest{i > 0 ? 's' : ''}</option>)}
                          </select>
                       </div>
                    </div>

                    <button type="submit" disabled={submitting} className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50">
                       {submitting ? 'Processing...' : 'Reserve'}
                    </button>
                 </form>

                 <p className="text-center text-slate-400 text-xs font-bold mt-4">You won't be charged yet</p>

                 {totalNights > 0 && (
                    <div className="mt-6 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                       <div className="flex justify-between font-bold text-slate-600 dark:text-slate-400">
                          <span>{formatPrice(room.basePrice)} x {totalNights} nights</span>
                          <span>{formatPrice(room.basePrice * totalNights)}</span>
                       </div>
                       <div className="flex justify-between font-bold text-slate-600 dark:text-slate-400">
                          <span>Service fee</span>
                          <span>0 VND</span>
                       </div>
                       <div className="flex justify-between font-black text-lg pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                          <span>Total</span>
                          <span>{formatPrice(room.basePrice * totalNights)}</span>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </main>
  );
}
