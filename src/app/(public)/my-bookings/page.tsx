"use client";

import { useEffect, useState } from "react";
import { BookingService } from "@/services/booking.service";
import { Booking } from "@/types/api";
import Link from "next/link";
import { getImageUrl } from "@/lib/image-utils";


export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');



  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await BookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.status.toLowerCase() === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Đơn đặt phòng của tôi</h1>
          <p className="text-slate-500 font-medium">Quản lý các chuyến đi và lịch sử lưu trú của bạn</p>
        </div>
        
        <div className="flex p-1 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ duyệt' : f === 'confirmed' ? 'Đã xác nhận' : f === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
           <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-slate-500 font-bold">Đang tải danh sách đơn đặt phòng...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-slate-300">event_busy</span>
           </div>
           <h3 className="text-xl font-black text-slate-900 mb-2">Chưa có đơn đặt phòng nào</h3>
           <p className="text-slate-500 font-medium mb-8">Hãy khám phá các địa điểm tuyệt vời và bắt đầu chuyến đi của bạn</p>
           <Link href="/discovery" className="px-8 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              Khám phá ngay
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    src={getImageUrl(booking.roomImage || (booking as any).RoomImage) || 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={booking.roomName} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                     <span className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${getStatusColor(booking.status)}`}>
                        {booking.status === 'pending' ? 'Chờ duyệt' : booking.status === 'confirmed' ? 'Đã xác nhận' : booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                     </span>
                  </div>
                </div>
                
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                       <div>
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{booking.roomName}</h3>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Mã phòng: {booking.roomCode} | Mã đơn: #{booking.id}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-2xl font-black text-slate-900">{(booking.totalPrice || 0).toLocaleString("vi-VN")} <span className="text-xs text-slate-400">VND</span></p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng chi trả</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày nhận phòng</p>
                          <p className="text-sm font-bold text-slate-900">{new Date(booking.checkIn).toLocaleDateString('vi-VN')}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày trả phòng</p>
                          <p className="text-sm font-bold text-slate-900">{new Date(booking.checkOut).toLocaleDateString('vi-VN')}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Số đêm</p>
                          <p className="text-sm font-bold text-slate-900">{booking.nights} đêm</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày đặt</p>
                          <p className="text-sm font-bold text-slate-900">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</p>
                       </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                     <Link href={`/rooms/${booking.roomId}`} className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">info</span>
                        Xem lại thông tin phòng
                     </Link>
                     
                     <div className="flex gap-3">
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                           Chi tiết hóa đơn
                        </button>
                        {booking.status === 'confirmed' && (
                           <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg">
                              Quản lý chuyến đi
                           </button>
                        )}
                        {booking.status === 'pending' && (
                           <button className="px-6 py-2.5 rounded-xl border-2 border-red-50 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-colors">
                              Hủy đặt phòng
                           </button>
                        )}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
