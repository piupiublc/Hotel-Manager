"use client";

import { useEffect, useState } from "react";
import { StatisticsService } from "@/services/statistics.service";
import { BookingService } from "@/services/booking.service";
import { PropertyService, Property } from "@/services/property.service";
import { Booking } from "@/types/api";

export default function BusinessDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [occupancy, setOccupancy] = useState(0);
  const [activeBookingsCount, setActiveBookingsCount] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await StatisticsService.getPartnerStats();
        if (stats) {
          setRevenue(stats.totalRevenue);
          setOccupancy(stats.occupancyRate);
          setActiveBookingsCount(stats.activeBookingsCount);
        }

        const myProperties = await PropertyService.getPartnerProperties();
        if (myProperties) setProperties(myProperties);

        const partnerBookings = await BookingService.getPartnerBookings();
        if (partnerBookings) setBookings(partnerBookings);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    }
    loadStats();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h2  className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Manage your properties and monitor real-time performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-2xl font-black mt-1">{revenue.toLocaleString("vi-VN")}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+4.2%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Bookings</p>
          <h3 className="text-2xl font-black mt-1">{activeBookingsCount}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">bed</span>
            </div>
            <span className="text-xs font-bold text-slate-500 flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full">Stable</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Occupancy Rate</p>
          <h3 className="text-2xl font-black mt-1">{occupancy.toFixed(1)}%</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">star</span>
            </div>
            <span className="text-xs font-bold text-rose-500 flex items-center bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-full">-0.4%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg. Rating</p>
          <h3 className="text-2xl font-black mt-1">4.85 VND</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold">Active Listings</h4>
            <a className="text-primary text-sm font-bold hover:underline" href="#">View All</a>
          </div>
          <div className="space-y-4">
            {properties.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                <p className="text-slate-500">No active listings found.</p>
              </div>
            ) : (
              properties.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                  <div className="w-40 h-28 flex-shrink-0 bg-slate-200 rounded-xl overflow-hidden relative">
                    <img alt={p.name} className="w-full h-full object-cover" src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop`} />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-bold">{p.name}</h5>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider h-fit ${
                        p.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {p.city}, {p.district}
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Type</p>
                        <p className="text-sm font-bold">{p.type}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rooms</p>
                        <p className="text-sm font-bold">{(p as any).rooms?.length || 0} rooms</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                    <a href={`/business/properties`} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-center">
                      Edit
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Recent Bookings</h4>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {bookings.slice(0, 5).map(b => (
                <div key={b.id} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{b.userName || `User #${b.userId}`}</p>
                    <p className="text-xs text-slate-500">{b.roomName || `Room #${b.roomId}`} • {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(b.totalPrice)}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    b.status === 'Chờ xác nhận' || b.status === 'Pending' || b.status?.toLowerCase() === 'confirmed' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' :
                    b.status === 'Hủy' || b.status === 'Cancelled' ? 'text-red-600 bg-red-50 dark:bg-red-900/30' : 
                    'text-green-600 bg-green-50 dark:bg-green-900/40'
                  }`}>
                    {b.status}
                  </span>
                  
                  {/* Action Buttons for Admin/Partner */}
                  {(b.status === 'Chờ xác nhận' || b.status === 'Pending') && (
                    <div className="flex gap-2">
                       <button onClick={async () => {
                         await BookingService.confirmBooking(b.id);
                         const allBookings = await BookingService.getAllBookings(); // reload
                         setBookings(allBookings || []);
                       }} className="text-xs bg-indigo-50 border border-indigo-200 font-semibold px-2 py-1 rounded text-indigo-700 hover:bg-indigo-100">Confirm</button>
                    </div>
                  )}
                </div>
              ))}

              <button className="w-full py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800">
                View All Bookings
              </button>
            </div>

          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Properties Location</h4>
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
                <div className="w-full h-full opacity-60 bg-[radial-gradient(#135bec_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white animate-pulse"></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full border-2 border-white animate-pulse"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg text-[10px] font-bold shadow-xl">
                {properties.length} Properties Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 lg:hidden">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  );
}
