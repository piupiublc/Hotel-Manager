
export default function UpdatedBookingWithMomoPay() {
  return (
    <>
      
<div className="layout-container flex h-full grow flex-col">
{/*  Top Navigation Bar  */}
<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
<div className="flex items-center gap-4 text-primary">
<div className="size-6">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
</svg>
</div>
<h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">StayMaster</h2>
</div>
<div className="flex flex-1 justify-end gap-4 items-center">
<div className="flex gap-2">
<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
<span className="material-symbols-outlined text-[20px]">notifications</span>
</button>
<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
<span className="material-symbols-outlined text-[20px]">person</span>
</button>
</div>
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" data-alt="User profile circular headshot thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvYo_ei-dJhs5IxJM-bO0aAk743r9RRLu839XUNMNksaswGQ5QUu_YFFvj3nzoksuL5CLgt0D3cccfICP36HsT_hoiyT37ktetC0TluHkOD0HJcxl_IZY0c5zg3NjGVbWljdEGwt1OfeOQsuAmm1zPFzBDGXB0OsIaREqI6nhCkkwn4HW9Xog1u_XF7FFoxof02jUXTxU8x8qHRaL27SkzJ-gZ0m1-jGkWkRBNZJRCpqMyuQFinV1BOTN5dkvpE5v8KPyMAG6_7mXp')" }}></div>
</div>
</header>
<main className="flex flex-1 justify-center py-8 px-4 md:px-10">
<div className="max-w-[1100px] w-full flex flex-col md:flex-row gap-8">
{/*  Left Column: Reservation Summary  */}
<div className="flex-1 flex flex-col gap-6">
<div className="flex flex-col gap-2">
<div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
<span className="material-symbols-outlined text-sm">lock</span> Secure Checkout
                        </div>
<h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Confirm and Pay</h1>
<p className="text-slate-500 dark:text-slate-400 text-base">You're just one step away from your dream stay at Azure Bay Resort.</p>
</div>
{/*  Trip Summary Card  */}
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
<div className="flex gap-4 items-start mb-6">
<div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
<img alt="Luxury ocean view hotel room" className="w-full h-full object-cover" data-alt="Luxurious beachfront resort suite interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR4cB6Dl96tLmy3VthpG8PFuXt6eqz-4bHnHnqQEjIjdiNlNRe-Ie3p-S_Cny-iLZ-rDgDkAFuoda2Pb0kUD_7HBbtkQ_44KZHDdnZeOuQlqtN9K3hqVyQHY-uLJspkkYQKWrgOnfHuFFpgDU6LHI2SB6ibYKgkX4Nq6io9FOLBYOj0CTpDmNrrXKm2lbsrQ_nZM9cze59MBzWCZjFOFe8Muuc-GWbDYaIz7qVL6-GMzwyBUKRvAjhgamfVZMbcfFG7FbSKRm7vAHk" />
</div>
<div>
<h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Deluxe Ocean View Suite</h3>
<p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">location_on</span> Maui, Hawaii
                                </p>
<div className="flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
<span className="text-sm font-bold text-slate-800 dark:text-slate-200">4.9</span>
<span className="text-sm text-slate-500">(128 reviews)</span>
</div>
</div>
</div>
<div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
<h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest mb-4">Reservation Details</h4>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
<div>
<p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">DATES</p>
<p className="text-slate-900 dark:text-slate-200 text-sm font-medium">Oct 12 - Oct 15, 2023</p>
</div>
<div>
<p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">GUESTS</p>
<p className="text-slate-900 dark:text-slate-200 text-sm font-medium">2 Adults</p>
</div>
{/*  New Time Selection Component  */}
<div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
<div>
<label className="block text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase">Check-in Time</label>
<select className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-primary focus:border-primary">
<option>3:00 PM (Default)</option>
<option>4:00 PM</option>
<option>5:00 PM</option>
<option>6:00 PM</option>
</select>
</div>
<div>
<label className="block text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase">Check-out Time</label>
<select className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-primary focus:border-primary">
<option>11:00 AM (Default)</option>
<option>10:00 AM</option>
<option>9:00 AM</option>
<option>8:00 AM</option>
</select>
</div>
<p className="col-span-2 text-[10px] text-slate-400 dark:text-slate-500 italic mt-1">Times are based on the property's local timezone.</p>
</div>
<div>
<p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">DURATION</p>
<p className="text-slate-900 dark:text-slate-200 text-sm font-medium">3 Nights</p>
</div>
<div>
<p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">CANCELLATION</p>
<p className="text-green-600 dark:text-green-400 text-sm font-medium">Free until Oct 10</p>
</div>
</div>
</div>
</div>
{/*  Protection Info  */}
<div className="flex items-start gap-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
<span className="material-symbols-outlined text-primary">verified_user</span>
<div>
<h4 className="font-bold text-slate-900 dark:text-white text-sm">StayMaster Protection</h4>
<p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">Every booking includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
</div>
</div>
</div>
{/*  Right Column: Payment Form  */}
<div className="w-full md:w-[420px] shrink-0">
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden sticky top-24">
<div className="p-6 border-b border-slate-100 dark:border-slate-800">
<h3 className="text-xl font-bold text-slate-900 dark:text-white">Price Breakdown</h3>
<div className="mt-4 space-y-3">
<div className="flex justify-between text-slate-600 dark:text-slate-400">
<span>$450.00 x 3 nights</span>
<span>$1,350.00</span>
</div>
<div className="flex justify-between text-slate-600 dark:text-slate-400">
<span>Cleaning fee</span>
<span>$120.00</span>
</div>
<div className="flex justify-between text-slate-600 dark:text-slate-400">
<span>StayMaster service fee</span>
<span>$185.50</span>
</div>
<div className="flex justify-between text-slate-600 dark:text-slate-400">
<span>Taxes</span>
<span>$142.15</span>
</div>
<div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
<span className="text-lg font-bold text-slate-900 dark:text-white">Total (USD)</span>
<span className="text-2xl font-black text-slate-900 dark:text-white">$1,797.65</span>
</div>
</div>
</div>
<div className="p-6">
<h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
<span className="material-symbols-outlined">payments</span> Payment Method
                            </h3>
<div className="space-y-6" >
{/*  Payment Method Tabs  */}
<div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
<button   className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold transition-all rounded-md">
<span className="material-symbols-outlined text-xl">credit_card</span> Card
                                    </button>
<button   className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold transition-all rounded-md">
<div className="w-5 h-5 bg-momo rounded flex items-center justify-center">
<span className="text-[10px] text-white font-black">Mo</span>
</div>
                                        MoMo
                                    </button>
</div>
{/*  Card Form  */}
<div className="space-y-4" >
<div>
<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Card Number</label>
<div className="relative">
<input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary" placeholder="0000 0000 0000 0000" type="text" />
<span className="material-symbols-outlined absolute right-3 top-3 text-slate-400">lock</span>
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Expiration</label>
<input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary" placeholder="MM / YY" type="text" />
</div>
<div>
<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">CVV</label>
<input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary" placeholder="123" type="password" />
</div>
</div>
<div>
<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Billing ZIP Code</label>
<input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary" placeholder="90210" type="text" />
</div>
<button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2" type="submit">
                                        Confirm Booking <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
{/*  MoMo QR Option  */}
<div className="flex flex-col items-center text-center py-4 animate-in fade-in slide-in-from-bottom-2 duration-300" >
<div className="mb-4 bg-white p-4 rounded-xl shadow-inner border border-slate-100">
{/*  Mock QR Code  */}
<div className="w-48 h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
<div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
  {Array.from({ length: 100 }).map((_, i) => (
    <div key={i} className="border-[0.5px] border-black"></div>
  ))}
</div>
<div className="z-10 bg-white p-2 border-2 border-momo rounded-md">
<div className="w-32 h-32 bg-slate-900 flex items-center justify-center">
<div className="grid grid-cols-4 grid-rows-4 gap-1 w-24 h-24">
<div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div>
<div className="bg-white"></div><div className="bg-slate-900"></div><div className="bg-slate-900"></div><div className="bg-white"></div>
<div className="bg-white"></div><div className="bg-slate-900"></div><div className="bg-slate-900"></div><div className="bg-white"></div>
<div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div>
</div>
</div>
</div>
<div className="absolute bottom-2 right-2 bg-momo text-white text-[8px] font-bold px-1 rounded">MoMo</div>
</div>
</div>
<h4 className="font-bold text-slate-900 dark:text-white">Scan to pay with MoMo</h4>
<p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[240px]">Open your MoMo app and scan this QR code to confirm your booking instantly.</p>
<div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
<button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-xl">refresh</span> Refresh QR Code
                                        </button>
</div>
</div>
</div>
<div className="mt-6 flex flex-col items-center gap-4">
<p className="text-[10px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                                    By selecting the button above, you agree to the Host's House Rules, StayMaster's Guest Rebooking and Refund Policy, and that StayMaster can charge your payment method if you're responsible for damage.
                                </p>
<div className="flex items-center gap-4 grayscale opacity-60">
<span className="material-symbols-outlined text-3xl">verified</span>
<span className="material-symbols-outlined text-3xl">security</span>
<span className="material-symbols-outlined text-3xl">shield</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
{/*  Footer Area  */}
<footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900">
<div className="max-w-[1100px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-2 opacity-50">
<span className="material-symbols-outlined text-xl">copyright</span>
<span className="text-sm font-medium">2023 StayMaster Inc.</span>
</div>
<div className="flex gap-6 text-sm font-medium text-slate-500">
<a className="hover:text-primary transition-colors" href="#">Privacy</a>
<a className="hover:text-primary transition-colors" href="#">Terms</a>
<a className="hover:text-primary transition-colors" href="#">Support</a>
</div>
</div>
</footer>
</div>

    </>
  );
}
