"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RoomService } from "@/services/room.service";
import { Room } from "@/types/api";

export default function CustomerDiscovery() {
  const [user, setUser] = useState<any>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const data = await RoomService.getAllRooms();
        
        // Filter rooms to show approved ones
        const validRooms = data.filter(r => 
          r.status?.toLowerCase() !== 'deleted' && 
          (r.isApproved === true || r.isApproved === null)
        );
        setRooms(validRooms);
      } catch (err) {
        console.error("Failed to load generic data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400">location_on</span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Location</span>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Where are you going?" type="text" />
              </div>
            </div>
            <div className="h-auto w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400">calendar_month</span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Check-in - Check-out</span>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Add dates" type="text" />
              </div>
            </div>
            <div className="h-auto w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400">group</span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Guests</span>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Add guests" type="text" />
              </div>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-3 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">search</span>
              Search
            </button>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-lg">attach_money</span>
                Price Range
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-lg">star</span>
                Guest Rating
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-lg">home_work</span>
                Property Type
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-lg">wifi</span>
                Amenities
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
            <p className="text-sm font-medium text-slate-500">Showing {rooms.length} results</p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12"><p className="text-slate-500 font-bold">Loading rooms...</p></div>
          ) : rooms.length === 0 ? (
            <div className="col-span-full text-center py-12"><p className="text-slate-500 font-bold">No rooms available right now.</p></div>
          ) : (
            rooms.map(room => (
              <Link key={room.id} href={`/rooms/${room.id}`} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  {room.mainImageUrl ? (
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.name} src={room.mainImageUrl} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <span className="material-symbols-outlined text-slate-300 text-6xl mb-2">bed</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="h-10 w-10 rounded-2xl bg-white/30 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/50 hover:scale-110 transition-all">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                     <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                        {room.roomType || 'Standard'}
                     </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-xs fill-icon">star</span>
                    <span className="text-xs font-black text-primary">{room.rating ? room.rating.toFixed(1) : "NEW"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-slate-500 text-sm font-bold mb-3">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="line-clamp-1">{room.propertyLocation || "Local Stay"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900 dark:text-white">{(room.basePrice || 0).toLocaleString("vi-VN")} VND</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/ night</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="material-symbols-outlined text-slate-300 text-lg">wifi</span>
                     <span className="material-symbols-outlined text-slate-300 text-lg">ac_unit</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Load more stays
          </button>
        </div>
      </main>
    </div>
  );
}
