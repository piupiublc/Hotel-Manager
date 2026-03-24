
export default function AdminRevenueAnalytics() {
  return (
    <>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
{/*  Page Header & Global Filters  */}
<div className="flex flex-col md:flex-row justify-between items-end gap-4">
<div className="space-y-1">
<h1 className="text-[30px] font-extrabold tracking-tighter text-on-background leading-tight">Revenue Deep-Dive</h1>
<p className="text-sm text-slate-500">Financial analysis for Q3 2023 performance indicators</p>
</div>
<div className="flex gap-2">
<div className="flex items-center bg-surface border border-outline-variant px-3 py-2 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-slate-400 mr-2 text-sm">calendar_today</span>
<select className="bg-transparent border-none text-sm font-semibold p-0 focus:ring-0 cursor-pointer">
<option>Last 30 Days</option>
<option>Last Quarter</option>
<option>Year to Date</option>
</select>
</div>
<button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">download</span> Export Report
                    </button>
</div>
</div>
{/*  Bento Grid: Key KPI Cards  */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50 space-y-4">
<div className="flex justify-between items-start">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">payments</span>
</div>
<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.4%</span>
</div>
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Revenue</p>
<h2 className="text-2xl font-extrabold text-on-background">$2.48M</h2>
</div>
<div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-primary w-3/4"></div>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50 space-y-4">
<div className="flex justify-between items-start">
<div className="p-2 bg-tertiary/10 rounded-lg">
<span className="material-symbols-outlined text-tertiary">sell</span>
</div>
<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8.2%</span>
</div>
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Fees</p>
<h2 className="text-2xl font-extrabold text-on-background">$342.1K</h2>
</div>
<div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-1/2"></div>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50 space-y-4">
<div className="flex justify-between items-start">
<div className="p-2 bg-slate-100 rounded-lg">
<span className="material-symbols-outlined text-slate-600">receipt_long</span>
</div>
<span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">-1.4%</span>
</div>
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Booking</p>
<h2 className="text-2xl font-extrabold text-on-background">$1,142</h2>
</div>
<div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-slate-400 w-2/3"></div>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50 space-y-4">
<div className="flex justify-between items-start">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">auto_graph</span>
</div>
<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+22%</span>
</div>
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Forecasted (Q4)</p>
<h2 className="text-2xl font-extrabold text-on-background">$3.1M</h2>
</div>
<div className="flex gap-1">
<div className="h-1 flex-1 bg-primary rounded-full"></div>
<div className="h-1 flex-1 bg-primary rounded-full"></div>
<div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
<div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
</div>
</div>
</div>
{/*  Revenue Streams & Forecast Chart Area  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/*  Main Comparison Chart  */}
<div className="lg:col-span-2 bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-center mb-8">
<div>
<h3 className="text-lg font-bold text-on-background">Revenue Comparison</h3>
<p className="text-xs text-slate-400">Booking Revenue vs Service Fees (Monthly)</p>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="text-[10px] font-bold uppercase text-slate-500">Bookings</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="text-[10px] font-bold uppercase text-slate-500">Fees</span>
</div>
</div>
</div>
<div className="relative h-64 w-full flex items-end gap-4 px-4 border-b border-slate-100 pb-2">
{/*  Simulated Chart Bars  */}
<div className="flex-1 flex flex-col justify-end gap-1 group">
<div className="w-full bg-tertiary/20 h-[30%] rounded-t-sm group-hover:bg-tertiary/40 transition-colors"></div>
<div className="w-full bg-primary h-[60%] rounded-t-sm group-hover:bg-primary/80 transition-colors"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">JAN</span>
</div>
<div className="flex-1 flex flex-col justify-end gap-1 group">
<div className="w-full bg-tertiary/20 h-[35%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[65%] rounded-t-sm"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">FEB</span>
</div>
<div className="flex-1 flex flex-col justify-end gap-1 group">
<div className="w-full bg-tertiary/20 h-[40%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[75%] rounded-t-sm"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">MAR</span>
</div>
<div className="flex-1 flex flex-col justify-end gap-1 group">
<div className="w-full bg-tertiary/20 h-[38%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[85%] rounded-t-sm"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">APR</span>
</div>
<div className="flex-1 flex flex-col justify-end gap-1 group relative">
<div className="w-full bg-tertiary/20 h-[45%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[95%] rounded-t-sm"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">MAY</span>
{/*  Tooltip Simulation  */}
<div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-on-background text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                $284,000
                            </div>
</div>
<div className="flex-1 flex flex-col justify-end gap-1 group">
<div className="w-full bg-tertiary/20 h-[30%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[50%] rounded-t-sm"></div>
<span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-slate-400">JUN</span>
</div>
</div>
</div>
{/*  Top Property Types  */}
<div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/50">
<h3 className="text-lg font-bold text-on-background mb-6">Property Performance</h3>
<div className="space-y-6">
<div className="space-y-2">
<div className="flex justify-between items-center text-sm">
<span className="font-medium text-slate-600">Luxury Villas</span>
<span className="font-bold text-on-background">$1.2M</span>
</div>
<div className="h-2 w-full bg-slate-100 rounded-full">
<div className="h-full bg-primary w-[85%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center text-sm">
<span className="font-medium text-slate-600">Urban Lofts</span>
<span className="font-bold text-on-background">$640K</span>
</div>
<div className="h-2 w-full bg-slate-100 rounded-full">
<div className="h-full bg-primary w-[55%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center text-sm">
<span className="font-medium text-slate-600">Beachfront</span>
<span className="font-bold text-on-background">$420K</span>
</div>
<div className="h-2 w-full bg-slate-100 rounded-full">
<div className="h-full bg-primary w-[40%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center text-sm">
<span className="font-medium text-slate-600">Cabins</span>
<span className="font-bold text-on-background">$220K</span>
</div>
<div className="h-2 w-full bg-slate-100 rounded-full">
<div className="h-full bg-primary w-[20%] rounded-full"></div>
</div>
</div>
</div>
<div className="mt-8 pt-6 border-t border-slate-50">
<button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">VIEW DETAILED BREAKDOWN</button>
</div>
</div>
</div>
{/*  Geographic Distribution & Detailed Ledger  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/*  Map Distribution  */}
<div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/50 relative overflow-hidden min-h-[400px]">
<div className="relative z-10 flex justify-between items-start mb-4">
<div>
<h3 className="text-lg font-bold text-on-background">Geographic Distribution</h3>
<p className="text-xs text-slate-400">Revenue concentration by major cities</p>
</div>
<div className="bg-white/90 backdrop-blur p-2 rounded-lg border border-slate-100 shadow-sm text-[10px] font-bold">
                            TOP: <span className="text-primary">LONDON</span>
</div>
</div>
{/*  Simulated Map Overlay  */}
<div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
<div className="w-full h-full opacity-20 grayscale mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover" data-alt="Subtle world map background texture"></div>
<div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-pulse border border-primary flex items-center justify-center" style={{ top: "40%", left: "45%" }}>
<div className="w-4 h-4 bg-primary rounded-full"></div>
</div>
<div className="absolute w-8 h-8 bg-primary/20 rounded-full border border-primary flex items-center justify-center" style={{ top: "30%", left: "70%" }}>
<div className="w-3 h-3 bg-primary rounded-full"></div>
</div>
<div className="absolute w-10 h-10 bg-primary/20 rounded-full border border-primary flex items-center justify-center" style={{ top: "60%", left: "30%" }}>
<div className="w-3.5 h-3.5 bg-primary rounded-full"></div>
</div>
</div>
<div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
<div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
<p className="text-[10px] font-bold text-slate-400 uppercase">Europe</p>
<p className="text-sm font-extrabold">$1.42M</p>
</div>
<div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
<p className="text-[10px] font-bold text-slate-400 uppercase">N. America</p>
<p className="text-sm font-extrabold">$840K</p>
</div>
<div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
<p className="text-[10px] font-bold text-slate-400 uppercase">Asia-Pacific</p>
<p className="text-sm font-extrabold">$220K</p>
</div>
</div>
</div>
{/*  Transactional Ledger  */}
<div className="bg-surface rounded-xl shadow-sm border border-outline-variant/50 flex flex-col">
<div className="p-8 border-b border-slate-50 flex justify-between items-center">
<h3 className="text-lg font-bold text-on-background">Recent Revenue Influx</h3>
<span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">more_horiz</span>
</div>
<div className="flex-1 overflow-x-auto">
<table className="w-full text-left text-sm">
<thead className="bg-slate-50/50 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
<tr>
<th className="px-8 py-4">Transaction ID</th>
<th className="px-4 py-4">Property</th>
<th className="px-4 py-4">Type</th>
<th className="px-4 py-4 text-right">Amount</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-8 py-4 font-mono text-xs text-slate-500">TXN-49201</td>
<td className="px-4 py-4 font-bold">Azure Bay Villa</td>
<td className="px-4 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">BOOKING</span></td>
<td className="px-4 py-4 text-right font-extrabold">$4,200.00</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-8 py-4 font-mono text-xs text-slate-500">TXN-49198</td>
<td className="px-4 py-4 font-bold">Skyline Penthouse</td>
<td className="px-4 py-4"><span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold">SERVICE</span></td>
<td className="px-4 py-4 text-right font-extrabold">$184.50</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-8 py-4 font-mono text-xs text-slate-500">TXN-49195</td>
<td className="px-4 py-4 font-bold">Cedar Creek Cabin</td>
<td className="px-4 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">BOOKING</span></td>
<td className="px-4 py-4 text-right font-extrabold">$890.00</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-8 py-4 font-mono text-xs text-slate-500">TXN-49192</td>
<td className="px-4 py-4 font-bold">Global Host Fee</td>
<td className="px-4 py-4"><span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold">SERVICE</span></td>
<td className="px-4 py-4 text-right font-extrabold">$2,105.00</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-8 py-4 font-mono text-xs text-slate-500">TXN-49189</td>
<td className="px-4 py-4 font-bold">London Mews</td>
<td className="px-4 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">BOOKING</span></td>
<td className="px-4 py-4 text-right font-extrabold">$1,540.00</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-slate-50 text-center">
<button className="text-xs font-bold text-slate-500 hover:text-on-background transition-colors">LOAD MORE TRANSACTIONS</button>
</div>
</div>
</div>
</div>
    </>
  );
}
