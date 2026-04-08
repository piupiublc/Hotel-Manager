"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { RoomService } from "@/services/room.service";
import { BookingService } from "@/services/booking.service";
import { Room, Booking } from "@/types/api";
import { format, isWithinInterval, parseISO, areIntervalsOverlapping } from "date-fns";
import { getImageUrl } from "@/lib/image-utils";


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
          BookingService.getAllBookings().catch(() => []) 
        ]);
        
        console.log("DEBUG: ALL ROOMS RECEIVED:", roomData);

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
    <div className="min-h-screen bg-slate-100 pb-20">
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Advanced Search Header */}
        <section className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 bg-white p-5 rounded-3xl shadow-xl shadow-indigo-100 border border-slate-100">
            <div className="flex-[2] flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-2xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tighter">Khu vực / Tên phòng</span>
                <input 
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-full placeholder:text-slate-400 text-slate-900" 
                  placeholder="Hà Nội, Sapa, hoặc tên chỗ ở..." 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="h-auto w-px bg-slate-200 hidden lg:block mx-1"></div>
            
            <div className="flex-1 flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-2xl border border-transparent focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tighter">Ngày nhận - trả</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold w-full text-slate-900"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  <span className="text-slate-300">|</span>
                  <input 
                    type="date" 
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold w-full text-slate-900"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all border border-slate-200 font-bold text-sm"
            >
              <span className="material-symbols-outlined text-xl">tune</span>
              Bộ lọc
            </button>

            <button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-10 py-4 font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25 active:scale-95">
              <span className="material-symbols-outlined text-2xl">search</span>
              TÌM KIẾM
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-6 bg-white rounded-3xl border border-slate-100 animate-in slide-in-from-top-4 duration-300 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">payments</span>
                    Khoảng giá (VND)
                  </h4>
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                     <input 
                        type="number" 
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-300"
                        placeholder="Từ"
                     />
                     <span className="text-slate-400 font-black">→</span>
                     <input 
                        type="number" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-300"
                        placeholder="Đến"
                     />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">meeting_room</span>
                    Phân loại phòng
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roomTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                          selectedType === type 
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                            : "bg-slate-50 border-transparent text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                    Theo thành phố
                  </h4>
                  <div className="relative">
                    <select 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl text-sm font-black focus:ring-2 focus:ring-primary appearance-none py-3.5 px-5 text-slate-900 cursor-pointer"
                    >
                      {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'Tất cả các tỉnh' : c}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Results Info Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <h2 className="text-3xl font-black text-slate-900 mb-1">Cần gì đó tuyệt vời?</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Tìm thấy <span className="text-primary">{processedRooms.length}</span> lựa chọn phù hợp nhất cho bạn
              </p>
           </div>
           
           {(checkIn && checkOut) && (
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[1.5rem] border border-slate-200 shadow-sm">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Ngày đã chọn</span>
                    <span className="text-sm font-black text-slate-900">{format(new Date(checkIn), 'dd/MM')} - {format(new Date(checkOut), 'dd/MM')}</span>
                 </div>
                 <div className="h-8 w-px bg-slate-200"></div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Tình trạng</span>
                    <span className="text-sm font-black text-green-500">{availableCount} Phòng trống</span>
                 </div>
              </div>
           )}
        </div>

        {/* Results Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col">
                 <div className="aspect-[4/5] bg-slate-200 rounded-[2rem] mb-4"></div>
                 <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-2"></div>
                 <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
              </div>
            ))
          ) : processedRooms.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                 <span className="material-symbols-outlined text-slate-300 text-6xl">search_off</span>
              </div>
              <p className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Opps! Không thấy phòng ở đây</p>
              <p className="text-slate-500 font-bold max-w-sm text-center mb-8">Hãy thử điều chỉnh lại bộ lọc hoặc tìm kiếm ở một khu vực khác gần đó bạn nhé.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                  setPriceRange([0, 10000000]);
                  setCheckIn("");
                  setCheckOut("");
                  setSelectedCity("All");
                }}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
              >
                Xóa tất cả các lọc
              </button>
            </div>
          ) : (
            processedRooms.map((room) => {
              // Standardizing image URL handling across potential backend name variations
              const rawUrl = room.mainImageUrl || (room as any).MainImageUrl;
              const displayImageUrl = getImageUrl(rawUrl);

              return (
              <Link key={room.id} href={`/rooms/${room.id}`} className={`group relative transition-all duration-500 ${!room.isAvailable ? 'opacity-80 scale-[0.98]' : ''}`}>
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-5 bg-white shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 group-hover:-translate-y-2 border border-slate-100">
                  {displayImageUrl ? (
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                      alt={room.name} 
                      src={displayImageUrl} 
                      onError={(e) => {
                        console.log("Image Load Failed:", displayImageUrl);
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                      <span className="material-symbols-outlined text-slate-200 text-6xl mb-2">hotel</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Chưa có ảnh</span>
                    </div>
                  )}
                  
                  {/* Overlay labels */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                     <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                        {room.roomType || 'Standard'}
                     </span>
                  </div>

                  <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button className="h-12 w-12 rounded-2xl bg-white/95 backdrop-blur-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all shadow-xl hover:scale-110">
                      <span className="material-symbols-outlined text-2xl">favorite</span>
                    </button>
                    <button className="h-12 w-12 rounded-2xl bg-white/95 backdrop-blur-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-xl hover:scale-110">
                      <span className="material-symbols-outlined text-2xl">share</span>
                    </button>
                  </div>
                  
                  <div className="absolute top-5 left-5">
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                        <span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
                        <span className="text-xs font-black text-slate-900">{room.rating ? room.rating.toFixed(1) : "NEW"}</span>
                    </div>
                  </div>
                  
                  {!room.isAvailable && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                       <div className="px-6 py-2 bg-white text-slate-900 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl scale-110">
                         Hết phòng
                       </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col px-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-4">
                    <span className="material-symbols-outlined text-base text-slate-300">near_me</span>
                    <span className="line-clamp-1">{room.propertyLocation || "Vị trí không xác định"}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">{(room.basePrice || 0).toLocaleString("vi-VN")}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">đ/đêm</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                       {room.isAvailable ? (
                          <div className="flex -space-x-2">
                             <div className="h-9 w-9 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-base">wifi</span>
                             </div>
                             <div className="h-9 w-9 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-base">ac_unit</span>
                             </div>
                             <div className="h-9 w-9 rounded-full bg-primary/10 border-4 border-white flex items-center justify-center text-primary">
                                <span className="text-[10px] font-black">+</span>
                             </div>
                          </div>
                       ) : (
                          <span className="text-[10px] font-black text-red-500 uppercase px-3 py-1 bg-red-50 border border-red-100 rounded-lg">Không sẵn sàng</span>
                       )}
                    </div>
                  </div>
                </div>
              </Link>
            )})
          )}
        </section>

        {processedRooms.length > 0 && !loading && (
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="h-px w-20 bg-slate-200"></div>
            <button className="px-12 py-5 rounded-[2rem] bg-white border border-slate-200 font-black text-slate-900 text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 active:scale-95">
              Khám phá thêm phòng
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
