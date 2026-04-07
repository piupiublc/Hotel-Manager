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
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const openInvoice = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowInvoice(true);
  };

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
                        {booking.status.toLowerCase() === 'confirmed' && (
                          <button 
                            onClick={() => openInvoice(booking)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">description</span>
                            In hóa đơn
                          </button>
                        )}
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

        {/* Invoice Modal */}
        {showInvoice && selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 print:bg-white print:p-0">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] print:shadow-none print:max-h-none print:w-full">
              {/* Header / Actions - Hidden on print */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center print:hidden">
                 <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Hóa Đơn Thanh Toán</h3>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => window.print()}
                      className="h-10 px-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-lg">print</span> Print & Save PDF
                    </button>
                    <button 
                      onClick={() => setShowInvoice(false)}
                      className="h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                 </div>
              </div>

              {/* Printable Content */}
              <div className="flex-1 overflow-y-auto p-10 print:p-0 print:overflow-visible bg-white text-slate-900 italic-safe">
                 <div className="print-content space-y-10">
                    {/* Branding */}
                    <div className="flex justify-between items-start">
                       <div>
                          <div className="text-2xl font-black text-primary tracking-tighter mb-1">STAYMASTER</div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Official Payment Receipt</p>
                       </div>
                       <div className="text-right">
                          <div className="text-sm font-black uppercase text-green-600 border-2 border-green-600 px-3 py-1 rounded-lg inline-block transform rotate-[-3deg]">PAID</div>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Booking #{selectedBooking.id}</p>
                       </div>
                    </div>

                    {/* Customer & Stay Info */}
                    <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                       <div className="space-y-4">
                          <section>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Thông tin khách hàng</h4>
                             <p className="text-sm font-bold">{user?.fullName || selectedBooking.userName}</p>
                             <p className="text-xs text-slate-500">{user?.email || "guest@staymaster.com"}</p>
                          </section>
                          <section>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Đơn vị cung cấp</h4>
                             <p className="text-sm font-bold text-primary">{selectedBooking.roomName.split('|')[0] || "StayMaster Partner"}</p>
                             <p className="text-xs text-slate-500 italic">Verified StayMaster Property</p>
                          </section>
                       </div>
                       <div className="space-y-4 bg-slate-50 p-6 rounded-2xl">
                          <div>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày lưu trú</h4>
                             <p className="text-xs font-bold">
                                {format(new Date(selectedBooking.checkIn), 'MMM dd, yyyy')} – {format(new Date(selectedBooking.checkOut), 'MMM dd, yyyy')}
                             </p>
                             <p className="text-[10px] font-bold text-primary uppercase">{selectedBooking.nights} Đêm</p>
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Loại phòng</h4>
                             <p className="text-xs font-bold uppercase tracking-tighter">{selectedBooking.roomName}</p>
                          </div>
                       </div>
                    </div>

                    {/* Charges Table */}
                    <div className="pt-10">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Chi tiết thanh toán</h4>
                       <table className="w-full text-sm">
                          <thead>
                             <tr className="border-b-2 border-slate-900">
                                <th className="text-left py-3 font-black">Mô tả</th>
                                <th className="text-right py-3 font-black">Thành tiền</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 leading-8">
                             <tr>
                                <td className="py-4">
                                   <span className="font-bold">Tiền thuê phòng</span>
                                   <div className="text-[10px] text-slate-400 leading-tight">Price Per Night: {(selectedBooking.pricePerNight || 0).toLocaleString("vi-VN")} VND</div>
                                </td>
                                <td className="py-4 text-right font-bold">{(selectedBooking.pricePerNight * selectedBooking.nights).toLocaleString("vi-VN")} VND</td>
                             </tr>
                             <tr>
                                <td className="py-4 text-slate-500">Phí & Thuế xử lý (Bao gồm)</td>
                                <td className="py-4 text-right text-slate-500">{(selectedBooking.totalPrice - (selectedBooking.pricePerNight * selectedBooking.nights)).toLocaleString("vi-VN")} VND</td>
                             </tr>
                          </tbody>
                          <tfoot>
                             <tr className="border-t-2 border-slate-900">
                                <td className="py-6 text-lg font-black uppercase tracking-tighter">Tổng cộng</td>
                                <td className="py-6 text-right text-2xl font-black text-primary">{(selectedBooking.totalPrice || 0).toLocaleString("vi-VN")} VND</td>
                             </tr>
                          </tfoot>
                       </table>
                    </div>

                    <div className="pt-10 border-t border-dashed border-slate-200">
                       <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-bold">Cảm ơn bạn đã tin tưởng dịch vụ của StayMaster!</p>
                       <p className="text-[8px] text-slate-300 text-center mt-1">Đây là hóa đơn điện tử được tạo tự động • BK-{selectedBooking.id}-{new Date().getTime().toString().slice(-4)}</p>
                    </div>
                 </div>
              </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * {
                  visibility: hidden;
                }
                .print-content, .print-content * {
                  visibility: visible;
                }
                .print-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  padding: 2cm;
                }
              }
            `}} />
          </div>
        )}
      </div>
    </div>
  );
}
