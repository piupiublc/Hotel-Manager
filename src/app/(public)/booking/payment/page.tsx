"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Room, CreateBookingRequest } from '@/types/api';
import { RoomService } from '@/services/room.service';
import { BookingService } from '@/services/booking.service';
import { useAuth } from '@/hooks/useAuth';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'bank_transfer'>('bank_transfer');
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  
  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests') || '1';

  useEffect(() => {
    if (!roomId) {
      router.push('/discovery');
      return;
    }
    fetchRoom();
  }, [roomId]);

  // Polling for payment status
  useEffect(() => {
    let interval: any;
    if (createdBookingId && !isPaid && paymentMethod === 'bank_transfer') {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      interval = setInterval(async () => {
        try {
          // 1. Trigger Sync with SePay (Proactive Check)
          await fetch(`${apiUrl}/bookings/${createdBookingId}/sync`);

          // 2. Check Local Status
          const res = await fetch(`${apiUrl}/bookings/${createdBookingId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'confirmed') {
              setIsPaid(true);
              clearInterval(interval);
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [createdBookingId, isPaid, paymentMethod]);

  const fetchRoom = async () => {
    try {
      const data = await RoomService.getRoomById(parseInt(roomId!));
      setRoom(data);
    } catch (err) {
      console.error("Failed to fetch room:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const basePrice = room ? room.basePrice : 0;
  const subtotal = basePrice * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee + taxes;

  const handleConfirm = async () => {
    if (!user) {
      alert("Please login to continue!");
      router.push('/login');
      return;
    }

    setSubmitting(true);
    try {
      const req: CreateBookingRequest = {
        roomId: parseInt(roomId!),
        checkIn: checkIn!,
        checkOut: checkOut!,
        guestCount: parseInt(guests)
      };
      const res = await BookingService.createBooking(req);
      
      if (paymentMethod === 'bank_transfer') {
        setCreatedBookingId(res.id);
        // Do not redirect, wait for polling
      } else {
        alert("Booking successful! Moving to your trips...");
        router.push('/profile');
      }
    } catch (err: any) {
      alert(err.message || "Failed to finalize booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );

  if (!room) return <div className="p-20 text-center font-bold">Room not found.</div>;

  // SePay Config
  const bankId = "Sacombank";
  const accountNo = "0385485516";
  const accountName = "TRAN DUC LONG";
  const description = `BK${createdBookingId}`;
  const qrUrl = `https://qr.sepay.vn/img?acc=${accountNo}&bank=${bankId}&amount=${total}&des=${description}`;

  return (
    <main className="flex flex-1 justify-center py-8 px-4 md:px-10">
      <div className="max-w-[1100px] w-full flex flex-col md:flex-row gap-8">
        {/* Left Column: Reservation Summary */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">lock</span> Secure Checkout
            </div>
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Confirm and Pay</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">You're just one step away from your stay at {room.propertyName || "the property"}.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 items-start mb-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  alt={room.name} 
                  className="w-full h-full object-cover bg-slate-100" 
                  src={room.mainImageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"} 
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{room.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span> {room.fullAddress || room.propertyLocation}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{room.rating || 4.5}</span>
                  <span className="text-sm text-slate-500 tracking-tighter">· Verified Property</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest mb-4">Trip Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">DATES</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm font-bold">
                    {checkIn ? new Date(checkIn).toLocaleDateString() : '-'} – {checkOut ? new Date(checkOut).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">GUESTS</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm font-bold">{guests} Guest{parseInt(guests) > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">DURATION</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm font-bold">{nights} night{nights > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">TYPE</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm font-bold uppercase tracking-tighter">{room.roomType || 'Standard Room'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">StayMaster Protection</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Your booking is protected. We provide support for cancellations or inaccuracies.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Price and Payment */}
        <div className="w-full md:w-[420px] shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Price Breakdown</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                  <span>{basePrice.toLocaleString("vi-VN")} x {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>{subtotal.toLocaleString("vi-VN")} VND</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                  <span>StayMaster service fee</span>
                  <span>{serviceFee.toLocaleString("vi-VN")} VND</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                  <span>Taxes</span>
                  <span>{taxes.toLocaleString("vi-VN")} VND</span>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{total.toLocaleString("vi-VN")} VND</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined">payments</span> Payment Method
              </h3>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
                <button 
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-lg ${paymentMethod === 'bank_transfer' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-lg">qr_code_2</span> VietQR
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-lg ${paymentMethod === 'card' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-lg">credit_card</span> Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('momo')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-lg ${paymentMethod === 'momo' ? 'bg-white dark:bg-slate-700 text-momo shadow-sm' : 'text-slate-500'}`}
                >
                  <div className="w-5 h-5 bg-momo rounded flex items-center justify-center">
                    <span className="text-[10px] text-white font-black">Mo</span>
                  </div>
                  MoMo
                </button>
              </div>

              {paymentMethod === 'bank_transfer' ? (
                <div className="flex flex-col items-center text-center">
                  {createdBookingId ? (
                    isPaid ? (
                      <div className="py-10 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="material-symbols-outlined text-4xl">check_circle</span>
                        </div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white">Payment Received!</h4>
                        <p className="text-sm text-slate-500 mt-2">Your booking is confirmed.</p>
                        
                        <div className="mt-8 flex flex-col gap-3">
                           <button 
                             onClick={() => setShowInvoice(true)}
                             className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
                           >
                              <span className="material-symbols-outlined">description</span> In hóa đơn thanh toán
                           </button>
                           <button 
                             onClick={() => router.push('/my-bookings')}
                             className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                           >
                              Go to My Bookings
                           </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 bg-white p-4 rounded-3xl shadow-lg border-4 border-primary/20 relative">
                           <img src={qrUrl} alt="VietQR" className="w-48 h-48 rounded-xl" />
                           <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                              LIVE Tracking
                           </div>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Scan to pay via VietQR</h4>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl w-full mt-4 space-y-2 text-left">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Account</span>
                              <span className="text-xs font-black text-slate-900 dark:text-white">{accountNo}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Bank</span>
                              <span className="text-xs font-black text-slate-900 dark:text-white">{bankId}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Amount</span>
                              <span className="text-sm font-black text-primary">{total.toLocaleString("vi-VN")} VND</span>
                           </div>
                           <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Content</span>
                              <span className="text-xs font-black text-slate-900 dark:text-white bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded">{description}</span>
                           </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-4 italic flex items-center gap-1 justify-center">
                          <span className="material-symbols-outlined text-xs animate-spin">sync</span> 
                          Waiting for your transaction...
                        </p>
                      </>
                    )
                  ) : (
                    <div className="w-full">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mb-6 border border-dashed border-slate-300 dark:border-slate-700">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">qr_code_scanner</span>
                        <p className="text-sm text-slate-500">We will generate a unique VietQR code linked to your booking ID.</p>
                      </div>
                      <button 
                        onClick={handleConfirm}
                        disabled={submitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {submitting ? 'Generating QR...' : 'Generate Pay QR'} <span className="material-symbols-outlined">qr_code</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Card Holder Name</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold" placeholder="JOHN DOE" type="text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Card Number</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold" placeholder="0000 0000 0000 0000" type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold" placeholder="MM / YY" type="text" />
                    <input className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold" placeholder="CVV" type="password" />
                  </div>
                  <button 
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'} <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-white p-4 rounded-3xl shadow-inner border border-slate-100">
                    <div className="w-40 h-40 bg-slate-900 p-3 rounded-2xl flex items-center justify-center">
                       <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full">
                          {Array.from({length: 25}).map((_, i) => (
                            <div key={i} className={`${(i+Math.floor(i/5)) % 2 === 0 ? 'bg-white' : 'bg-slate-900'} rounded-sm`}></div>
                          ))}
                       </div>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Scan to pay with MoMo</h4>
                  <p className="text-xs text-slate-500 mt-2">Finalize your payment of {total.toLocaleString("vi-VN")} VND</p>
                  <button 
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="w-full mt-6 bg-momo hover:bg-momo/90 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-momo/20 disabled:opacity-50"
                  >
                    {submitting ? 'Verifying...' : 'Ready to confirm'}
                  </button>
                </div>
              )}

              <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-6">
                By confirming, you agree to StayMaster's Terms of Service and Cancellation Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && room && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 print:bg-white print:p-0">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-full print:shadow-none print:max-h-none print:w-full">
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
            <div className="flex-1 overflow-y-auto p-10 print:p-0 print:overflow-visible bg-white text-slate-900 dark:text-slate-100 italic-safe">
               <div className="print-content space-y-10">
                  {/* Branding */}
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="text-2xl font-black text-primary tracking-tighter mb-1">STAYMASTER</div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Official Payment Receipt</p>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-black uppercase text-green-600 border-2 border-green-600 px-3 py-1 rounded-lg inline-block transform rotate-[-3deg]">PAID</div>
                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Booking #{createdBookingId}</p>
                     </div>
                  </div>

                  {/* Customer & Stay Info */}
                  <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                     <div className="space-y-4">
                        <section>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Thông tin khách hàng</h4>
                           <p className="text-sm font-bold">{user?.fullName || "Verified Guest"}</p>
                           <p className="text-xs text-slate-500">{user?.email || "guest@staymaster.com"}</p>
                        </section>
                        <section>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Đơn vị cung cấp</h4>
                           <p className="text-sm font-bold text-primary">{room?.propertyName || "StayMaster Partner"}</p>
                           <p className="text-xs text-slate-500 italic">{room?.fullAddress || room?.propertyLocation}</p>
                        </section>
                     </div>
                     <div className="space-y-4 bg-slate-50 p-6 rounded-2xl">
                        <div>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày lưu trú</h4>
                           <p className="text-xs font-bold">{checkIn} – {checkOut}</p>
                           <p className="text-[10px] font-bold text-primary uppercase">{nights} Đêm • {guests} Khách</p>
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Loại phòng</h4>
                           <p className="text-xs font-bold uppercase tracking-tighter">{room?.name}</p>
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
                                 <div className="text-[10px] text-slate-400 leading-tight">{basePrice.toLocaleString("vi-VN")} VND × {nights} đêm</div>
                              </td>
                              <td className="py-4 text-right font-bold">{subtotal.toLocaleString("vi-VN")} VND</td>
                           </tr>
                           <tr>
                              <td className="py-4 text-slate-500">Phí dịch vụ StayMaster (10%)</td>
                              <td className="py-4 text-right text-slate-500">{serviceFee.toLocaleString("vi-VN")} VND</td>
                           </tr>
                           <tr>
                              <td className="py-4 text-slate-500">Thuế (5%)</td>
                              <td className="py-4 text-right text-slate-500">{taxes.toLocaleString("vi-VN")} VND</td>
                           </tr>
                        </tbody>
                        <tfoot>
                           <tr className="border-t-2 border-slate-900">
                              <td className="py-6 text-lg font-black uppercase tracking-tighter">Tổng cộng</td>
                              <td className="py-6 text-right text-2xl font-black text-primary">{total.toLocaleString("vi-VN")} VND</td>
                           </tr>
                        </tfoot>
                     </table>
                  </div>

                  <div className="pt-10 border-t border-dashed border-slate-200">
                     <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-bold">Cảm ơn bạn đã tin tưởng dịch vụ của StayMaster!</p>
                     <p className="text-[8px] text-slate-300 text-center mt-1">Đây là hóa đơn điện tử được tạo tự động • BK-{createdBookingId}-{new Date().getTime().toString().slice(-4)}</p>
                  </div>
               </div>
            </div>
          </div>
          <style jsx global>{`
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
          `}</style>
        </div>
      )}
    </main>
  );
}

export default function UpdatedBookingWithMomoPay() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
      <PaymentContent />
    </Suspense>
  );
}
