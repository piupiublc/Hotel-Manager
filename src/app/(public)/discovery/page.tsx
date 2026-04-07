"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { RoomService } from "@/services/room.service";
import { BookingService } from "@/services/booking.service";
import { Room, Booking } from "@/types/api";
import { format, isWithinInterval, parseISO, areIntervalsOverlapping } from "date-fns";

export default function CustomerDiscovery() {
  const [user, setUser] = useState<any>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const cities = ["All", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang", "Đà Lạt", "Sa Pa", "Vũng Tàu", "Hội An"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const [roomData, bookingData] = await Promise.all([
          RoomService.getAllRooms(),
          // For checking availability, we might need bookings if we want to do it client-side
          // In a real app, this would be an API call specifically for availability
          BookingService.getAllBookings().catch(() => []) 
        ]);
        
        // Filter rooms to show approved ones
        const validRooms = roomData.filter(r => 
          r.status?.toLowerCase() !== 'deleted' && 
          (r.isApproved === true || r.isApproved === null)
        );
        setRooms(validRooms);
        setBookings(bookingData);
      } catch (err) {
        console.error("Failed to load generic data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const processedRooms = useMemo(() => {
    return rooms.map(room => {
      // Basic matching
      const matchesSearch = 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (room.propertyLocation || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.fullAddress || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "All" || room.roomType === selectedType;
      const matchesPrice = room.basePrice >= priceRange[0] && room.basePrice <= priceRange[1];
      const matchesCity = selectedCity === "All" || 
        room.propertyLocation?.includes(selectedCity) || 
        room.fullAddress?.includes(selectedCity) || 
        (room as any).city === selectedCity;

      // Availability check
      let isAvailable = true;
      let hasConflict = false;
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        if (checkInDate < checkOutDate) {
          hasConflict = bookings.some(b => {
             if (b.roomId !== room.id) return false;
             if (b.status?.toLowerCase() === 'cancelled') return false;
             
             const bIn = parseISO(b.checkIn);
             const bOut = parseISO(b.checkOut);
             
             return areIntervalsOverlapping(
               { start: checkInDate, end: checkOutDate },
               { start: bIn, end: bOut },
               { inclusive: false }
             );
          });
          isAvailable = !hasConflict;
        }
      }

      return { 
        ...room, 
        isAvailable, 
        isVisible: matchesSearch && matchesType && matchesPrice && matchesCity 
      };
    }).filter(r => r.isVisible);
  }, [rooms, searchQuery, selectedType, priceRange, checkIn, checkOut, bookings, selectedCity]);

  const availableCount = processedRooms.filter(r => r.isAvailable).length;

  const roomTypes = useMemo(() => {
    const types = Array.from(new Set(rooms.map(r => r.roomType).filter((t): t is string => !!t)));
    return ["All", ...types];
  }, [rooms]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Advanced Search Header */}
        <section className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <div className="flex-[2] flex items-center gap-3 px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tighter">Khu vực / Tên phòng</span>
                <input 
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-full placeholder:text-slate-400 text-slate-900 dark:text-white" 
                  placeholder="Hà Nội, Sapa, hoặc tên chỗ ở..." 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="h-auto w-px bg-slate-200 dark:bg-slate-700 hidden lg:block mx-1"></div>
            
            <div className="flex-1 flex items-center gap-3 px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tighter">Ngày nhận - trả</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold w-full text-slate-900 dark:text-white"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  <span className="text-slate-300">|</span>
                  <input 
                    type="date" 
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold w-full text-slate-900 dark:text-white"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all border border-slate-200 dark:border-slate-700 font-bold text-sm"
            >
              <span className="material-symbols-outlined text-xl">tune</span>
              Bộ lọc
            </button>

            <button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-10 py-4 font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25 active:scale-95">
              <span className="material-symbols-outlined text-2xl">search</span>
              Tìm không gian
            </button>
          </div>
          
          {/* Quick Filter Sidebar/Modal Replacement */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">payments</span>
                    Khoảng giá (VND)
                  </h4>
                  <div className="flex items-center gap-3">
                     <input 
                        type="number" 
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-primary"
                        placeholder="Từ"
                     />
                     <span className="text-slate-400">→</span>
                     <input 
                        type="number" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-primary"
                        placeholder="Đến"
                     />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">meeting_room</span>
                    Phân loại
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roomTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                          selectedType === type 
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                            : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    Khu vực
                  </h4>
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-primary appearance-none py-3 px-4"
                  >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedType("All");
                      setSelectedCity("All");
                      setPriceRange([0, 10000000]);
                      setCheckIn("");
                      setCheckOut("");
                    }}
                    className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Mặc định
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Status bar */}
        <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <div className="flex items-center gap-2">
                   <span className={`h-3 w-3 rounded-full ${checkIn && checkOut ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                     {checkIn && checkOut ? 'Sẵn sàng đặt phòng' : 'Vui lòng chọn ngày'}
                   </p>
                </div>
                {checkIn && checkOut && (
                  <>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                       {availableCount} phòng còn trống
                    </p>
                  </>
                )}
             </div>
          </div>
          
          {checkIn && checkOut && availableCount < processedRooms.length && (
             <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900 rounded-2xl text-[10px] font-bold uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                Lưu ý: Một số phòng đã bị trùng lịch đặt trong thời gian này
             </div>
          )}
        </section>

        {/* Results Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Đang tải phòng...</p>
            </div>
          ) : processedRooms.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <span className="material-symbols-outlined text-slate-200 dark:text-slate-800 text-9xl mb-4">search_off</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mb-2">Không tìm thấy phòng nào!</p>
              <p className="text-slate-500 font-bold max-w-sm text-center">Chúng tôi không tìm thấy phòng trống nào trùng với yêu cầu của bạn hoặc có thể đã bị đặt hết trong thời gian này.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                  setPriceRange([0, 10000000]);
                  setCheckIn("");
                  setCheckOut("");
                }}
                className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/25 hover:scale-105 transition-all"
              >
                Reset lại tìm kiếm
              </button>
            </div>
          ) : (
            processedRooms.map((room) => (
              <Link key={room.id} href={`/rooms/${room.id}`} className={`group relative ${!room.isAvailable ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-transform duration-500 group-hover:-translate-y-2">
                  {room.mainImageUrl ? (
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={room.name} src={room.mainImageUrl} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <span className="material-symbols-outlined text-slate-300 text-6xl mb-2">bed</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Không có ảnh</span>
                    </div>
                  )}
                  
                  <div className="absolute top-5 right-5 flex flex-col gap-2">
                    <button className="h-11 w-11 rounded-2xl bg-white/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all shadow-xl">
                      <span className="material-symbols-outlined text-2xl">favorite</span>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                     <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                        {room.roomType || 'Standard'}
                     </span>
                     
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg">
                        <span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">{room.rating ? room.rating.toFixed(1) : "MỚI"}</span>
                     </div>
                  </div>
                  
                  {/* Availability Badge */}
                  {checkIn && checkOut && (
                    <div className="absolute top-5 left-5">
                       {room.isAvailable ? (
                         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-xl">
                           <span className="material-symbols-outlined text-xs">event_available</span>
                           Còn trống
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-xl">
                           <span className="material-symbols-outlined text-xs">event_busy</span>
                           Hết phòng
                         </div>
                       )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold mb-3">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span>
                    <span className="line-clamp-1">{room.propertyLocation || "Vị trí không xác định"}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{(room.basePrice || 0).toLocaleString("vi-VN")} <span className="text-xs text-slate-400">VND</span></span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mỗi đêm</span>
                    </div>
                    {!room.isAvailable ? (
                       <span className="text-xs font-black text-red-500 uppercase tracking-tighter">Đã có người đặt</span>
                    ) : (
                      <div className="flex gap-2">
                         <span className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 material-symbols-outlined text-lg">wifi</span>
                         <span className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 material-symbols-outlined text-lg">ac_unit</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>

        {processedRooms.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 font-black text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all shadow-xl shadow-slate-200/50 dark:shadow-none">
              Xem thêm các phòng khác
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

