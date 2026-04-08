"use client";

import { useEffect, useState } from "react";
import { BookingService } from "@/services/booking.service";
import { toast } from "react-hot-toast";
import { 
  Calendar, CheckCircle2, LogIn, LogOut, Search, User, 
  MapPin, Phone, Mail, Clock, ArrowRight, Loader2,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function CheckInOutPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"checkin" | "checkout" | "history">("checkin");
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getPartnerBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Không thể tải danh sách đặt phòng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckIn = async (id: number) => {
    try {
      setProcessingId(id);
      await BookingService.checkIn(id);
      toast.success("Check-in thành công!");
      fetchBookings();
    } catch (error) {
      toast.error("Lỗi khi check-in");
    } finally {
      setProcessingId(null);
    }
  };

  const handleCheckOut = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn hoàn thành booking và checkout cho khách hàng này?")) return;
    
    try {
      setProcessingId(id);
      await BookingService.complete(id);
      toast.success("Checkout thành công! Tiền đã được cộng vào số dư của bạn.");
      fetchBookings();
    } catch (error) {
      toast.error("Lỗi khi checkout");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "checkin") {
      return b.status?.toLowerCase() === "confirmed" && matchesSearch;
    } else if (activeTab === "checkout") {
      return b.status?.toLowerCase() === "checked_in" && matchesSearch;
    } else {
      return b.status?.toLowerCase() === "completed" && matchesSearch;
    }
  });

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50/50  min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900  flex items-center gap-3">
            Check-in/Out Management
          </h1>
          <p className="text-slate-500  font-medium">
            Manage your guest arrivals and departures in one place.
          </p>
        </div>
      </div>

      {/* Tabs and Search Section */}
      <div className="bg-white  rounded-2xl shadow-sm border border-slate-200  p-4 sticky top-4 z-10 backdrop-blur-xl bg-white/80 ">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex p-1.5 bg-slate-100  rounded-2xl w-full md:w-auto border border-slate-200 ">
            <button
              onClick={() => setActiveTab("checkin")}
              className={`flex-1 md:w-44 py-2.5 px-6 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "checkin"
                  ? "bg-white  text-slate-900  shadow-xl shadow-slate-200/50  ring-1 ring-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 "
              }`}
            >
              <LogIn className={`w-4 h-4 ${activeTab === 'checkin' ? 'text-primary' : ''}`} />
              NHẬN PHÒNG
              {bookings.filter(b => b.status?.toLowerCase() === "confirmed").length > 0 && (
                <span className="bg-primary text-white text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 font-black">
                  {bookings.filter(b => b.status?.toLowerCase() === "confirmed").length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("checkout")}
              className={`flex-1 md:w-44 py-2.5 px-6 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "checkout"
                  ? "bg-white  text-slate-900  shadow-xl shadow-slate-200/50  ring-1 ring-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 "
              }`}
            >
              <LogOut className={`w-4 h-4 ${activeTab === 'checkout' ? 'text-emerald-500' : ''}`} />
              TRẢ PHÒNG
              {bookings.filter(b => b.status?.toLowerCase() === "checked_in").length > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 font-black">
                  {bookings.filter(b => b.status?.toLowerCase() === "checked_in").length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 md:w-44 py-2.5 px-6 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "history"
                  ? "bg-white  text-slate-900  shadow-xl shadow-slate-200/50  ring-1 ring-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 "
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeTab === 'history' ? 'text-amber-500' : ''}`} />
              LỊCH SỬ
            </button>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by room or guest name..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50  border border-slate-200  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <Loader2 className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="text-slate-500 font-semibold animate-pulse tracking-wide">
              Đang đồng bộ dữ liệu đặt phòng...
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="col-span-full py-24 bg-white/50  backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-slate-200  flex flex-col items-center justify-center gap-6 text-center">
            <div className="w-20 h-20 bg-slate-100  rounded-[1.5rem] flex items-center justify-center text-slate-400 rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <Calendar className="w-10 h-10" />
            </div>
            <div className="max-w-xs space-y-2">
              <h3 className="text-xl font-bold text-slate-900 ">
                Không có dữ liệu
              </h3>
              <p className="text-slate-500  text-sm leading-relaxed">
                Hiện tại không có phòng nào trong danh mục {activeTab === "checkin" ? "chờ nhận phòng" : activeTab === "checkout" ? "chờ trả phòng" : "lịch sử"}
              </p>
            </div>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id}
              className="group relative bg-white  rounded-[2rem] border border-slate-200  shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="p-8 flex-1 space-y-6 relative">
                 {/* ID and Date Header */}
                {/* Header: ID and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-slate-900  rounded-lg shadow-sm">
                      <span className="text-[11px] font-black text-white  tracking-tighter">
                        #{booking.id.toString().padStart(5, '0')}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-[10px] uppercase tracking-wider ${
                      booking.status?.toLowerCase() === 'confirmed' 
                        ? 'bg-blue-50 border-blue-100 text-blue-600   '
                        : booking.status?.toLowerCase() === 'checked_in'
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600   '
                        : 'bg-slate-50 border-slate-100 text-slate-600   '
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        booking.status?.toLowerCase() === 'confirmed' ? 'bg-blue-500 animate-pulse' : 
                        booking.status?.toLowerCase() === 'checked_in' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                      }`} />
                      {booking.status === 'confirmed' ? 'Chờ nhận phòng' : booking.status === 'checked_in' ? 'Đang lưu trú' : 'Đã hoàn tất'}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100  rounded-full text-[10px] font-bold text-slate-500  border border-slate-200 ">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>Đã đặt lúc: {format(new Date(booking.createdAt), "HH:mm, dd/MM", { locale: vi })}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Guest Info */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Khách hàng</label>
                       <div className="flex items-center gap-4">
                          <div className="relative">
                             <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200   rounded-2xl flex items-center justify-center text-slate-600  shadow-inner overflow-hidden border border-slate-200 ">
                               {booking.userAvatar ? (
                                 <img src={booking.userAvatar} alt={booking.userName} className="w-full h-full object-cover" />
                               ) : (
                                 <User className="w-6 h-6" />
                               )}
                             </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white  rounded-full" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900  text-lg leading-tight">
                              {booking.userName || "Khách vãng lai"}
                            </h4>
                            <p className="text-xs font-medium text-slate-500">Mã: ST-{booking.id + 1000}</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phòng</label>
                        <div className="p-4 bg-slate-50  rounded-2xl border border-slate-100  group-hover:border-primary/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
                           <h4 className="font-black text-slate-900  line-clamp-1">{booking.roomName}</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black rounded uppercase">{booking.roomCode}</span>
                              <span className="text-[10px] text-slate-500 font-bold italic">Phòng tiêu chuẩn</span>
                           </div>
                        </div>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thời gian</label>
                       <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 text-center">
                            <p className="text-xs font-black text-slate-900 ">
                              {format(new Date(booking.checkIn), "dd MMM", { locale: vi })}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500">Check-in</p>
                          </div>
                          <div className="flex flex-col items-center px-4">
                             <div className="w-8 h-[2px] bg-slate-200  relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300  rounded-full" />
                             </div>
                             <span className="text-[9px] font-black text-slate-400 mt-1 uppercase leading-none">{booking.nights} đêm</span>
                          </div>
                          <div className="flex-1 text-center">
                            <p className="text-xs font-black text-slate-900 ">
                              {format(new Date(booking.checkOut), "dd MMM", { locale: vi })}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500">Check-out</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thanh toán</label>
                       <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-slate-900  tracking-tight">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalPrice)}
                          </span>
                          <div className="px-2 py-1 bg-green-500/10 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                            Đã thanh toán
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {booking.note && (
                  <div className="p-4 bg-amber-50  border border-amber-100  rounded-2xl flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800  leading-relaxed italic">
                      “{booking.note}”
                    </p>
                  </div>
                )}
              </div>

              {/* Action Area */}
              <div className="p-6 bg-slate-50  border-t border-slate-100  mt-auto">
                {activeTab === "checkin" ? (
                  <button
                    disabled={processingId === booking.id}
                    onClick={() => handleCheckIn(booking.id)}
                    className="w-full h-14 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-primary hover:to-indigo-600    text-white rounded-[1.25rem] font-black text-sm transition-all duration-300 shadow-xl shadow-slate-200  hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 group/btn"
                  >
                    {processingId === booking.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <LogIn className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    )}
                    XÁC NHẬN CHECK-IN
                  </button>
                ) : activeTab === "checkout" ? (
                  <button
                    disabled={processingId === booking.id}
                    onClick={() => handleCheckOut(booking.id)}
                    style={{ backgroundColor: '#4f46e5' }}
                    className="w-full h-14 hover:opacity-90 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {processingId === booking.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    <span className="tracking-widest uppercase font-black">HOÀN TẤT & CHECK-OUT</span>
                  </button>
                ) : (
                   <div className="w-full h-14 bg-slate-100  rounded-xl flex items-center justify-center gap-2 text-slate-500 font-bold text-sm border border-dashed border-slate-200 ">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      GIAO DỊCH ĐÃ HOÀN TẤT
                   </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

