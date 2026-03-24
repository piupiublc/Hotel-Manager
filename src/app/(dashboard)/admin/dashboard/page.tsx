
export default function AdminDashboard() {
  return (
    <>
      <div className="p-8 space-y-8">
{/*  Page Title  */}
<div>
<h2 className="text-3xl font-extrabold tracking-tight">Executive Overview</h2>
<p className="text-slate-500 dark:text-slate-400">Real-time performance metrics for StayMaster platform.</p>
</div>
{/*  KPI Cards  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">account_balance_wallet</span>
</div>
<span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span> +12.4%
                            </span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
<h3 className="text-2xl font-bold mt-1">$4,284,500.00</h3>
</div>
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
<span className="material-symbols-outlined">groups</span>
</div>
<span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span> +5.2%
                            </span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Users</p>
<h3 className="text-2xl font-bold mt-1">12,580</h3>
</div>
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
<span className="material-symbols-outlined">show_chart</span>
</div>
<span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span> +2.1%
                            </span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Platform Growth</p>
<h3 className="text-2xl font-bold mt-1">+18.4%</h3>
</div>
</div>
{/*  Charts Section  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h4 className="font-bold">Revenue Trends</h4>
<select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold py-1 px-3">
<option>Last 6 months</option>
<option>Last Year</option>
</select>
</div>
<div className="h-64 flex items-end gap-2 px-2">
<div className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: "60%" }}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$420k</div>
</div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: "45%" }}></div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: "75%" }}></div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: "65%" }}></div>
<div className="flex-1 bg-primary rounded-t-lg relative group" style={{ height: "90%" }}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded">$1.2M</div>
</div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: "80%" }}></div>
</div>
<div className="flex justify-between mt-4 px-2">
<span className="text-[10px] font-bold text-slate-400">JAN</span>
<span className="text-[10px] font-bold text-slate-400">FEB</span>
<span className="text-[10px] font-bold text-slate-400">MAR</span>
<span className="text-[10px] font-bold text-slate-400">APR</span>
<span className="text-[10px] font-bold text-primary">MAY</span>
<span className="text-[10px] font-bold text-slate-400">JUN</span>
</div>
</div>
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h4 className="font-bold">Business Distribution</h4>
<span className="material-symbols-outlined text-slate-400 cursor-pointer">more_horiz</span>
</div>
<div className="flex items-center justify-center h-64">
{/*  Circular Progress Visualization  */}
<div className="relative size-48">
<svg className="size-full" viewBox="0 0 36 36">
<path className="text-slate-100 dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3"></path>
<path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="65, 100" strokeLinecap="round" strokeWidth="3"></path>
<path className="text-indigo-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round" strokeWidth="3"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-extrabold">2.4k</span>
<span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Partners</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 gap-4 mt-2">
<div className="flex items-center gap-2">
<span className="size-2 rounded-full bg-primary"></span>
<span className="text-xs font-medium text-slate-600 dark:text-slate-400">Hotels (65%)</span>
</div>
<div className="flex items-center gap-2">
<span className="size-2 rounded-full bg-indigo-400"></span>
<span className="text-xs font-medium text-slate-600 dark:text-slate-400">Resorts (25%)</span>
</div>
</div>
</div>
</div>
{/*  Business Management Table  */}
<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
<div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
<h4 className="font-bold">Business Partner Accounts</h4>
<div className="flex gap-2">
<button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Export CSV</button>
<button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Filter</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 dark:bg-slate-800/50">
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Business Name</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Sync</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
<tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
<img className="object-cover size-full" data-alt="Luxury hotel facade" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp_onK_5kU6MhZDNPh1ZSV3-EIqVLVQrsOMr-X8fXwUs83Y9RhxcPiSKXJd6SyfNoSj0EoXR365fxEvrIMX4sFJZpDktwvnx0dOlTapSTOQwnXKK3CbCRqoCElMmOtbe1Wf-jweQbqtzHj7kO6gT4--NjVtbSxSGh9V-A9sMfbfEPLbAgiJNdEMAVMHTnfH27K5DKwEdsET8OeQz4M0dfGH5j3flA8M3MuOJo0JIcxm7KF7VLuZ9vktmqLbf1a5sTzrA9tltbe36Gm" />
</div>
<div>
<p className="text-sm font-bold">Grand Plaza Hotel</p>
<p className="text-xs text-slate-500">ID: BIZ-89021</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Hotel</span>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
<span className="size-1.5 bg-emerald-500 rounded-full"></span> Active
                                        </span>
</td>
<td className="px-6 py-4 font-bold text-sm">$42,500</td>
<td className="px-6 py-4 text-xs text-slate-500">2 mins ago</td>
<td className="px-6 py-4 text-right">
<button className="text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">edit_square</span>
</button>
</td>
</tr>
<tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
<img className="object-cover size-full" data-alt="Beachfront resort aerial view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEUm_TR8tg9Eha-VUMosTFvTX9HEgw0sHYcc59PhrA_aLDQ5-eUBusG672eUAjTGtD4na35l2mIjj5lygtOhoifnmKVh5ZRAQsjPjuZrOpvZLgfFVQRw-2g8Ztc2ym9yClXGViZ6AiHgHO4bBWPuQJMkGGRArX_BkBLKoXxkoBtbZNzUsG8Whekqoe4K5WqgPfOBXx8Z-mAet6AchYLdYSyA6Q9oCn9bF1R0x7_oTBjnhPlQIWAsrqm6C03tjKGnM0K4s8b649NVUZ" />
</div>
<div>
<p className="text-sm font-bold">Azure Bay Resort</p>
<p className="text-xs text-slate-500">ID: BIZ-89044</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Resort</span>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
<span className="size-1.5 bg-emerald-500 rounded-full"></span> Active
                                        </span>
</td>
<td className="px-6 py-4 font-bold text-sm">$89,200</td>
<td className="px-6 py-4 text-xs text-slate-500">1 hour ago</td>
<td className="px-6 py-4 text-right">
<button className="text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">edit_square</span>
</button>
</td>
</tr>
<tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
<img className="object-cover size-full" data-alt="Modern apartment interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeXQi1KumtOymviIehKrt3o2lw1Wood7i4rHJUwpSpX_Ww3H3HHIuagNBD8stGGvDHxnhXjSld89IYPCnvnyURRSKF4KhdTi7Jloy03yrcy3aGP-5MOwSxFuXv_wswI7CFvKLnyYRcJYtA1hEQY5iP7NG5sqZTmrvkrrGIoQhRROSlFhlJ1D1ssjuejMRV5dYbHwIz3k6VJH-ZbOsNT0KAyanLNzsUL-39wzErQGOOz1l4s_jDYIQ4KYvEzdXXPlsTTp8Dw82GDP5k" />
</div>
<div>
<p className="text-sm font-bold">Urban Suites</p>
<p className="text-xs text-slate-500">ID: BIZ-77210</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Apartment</span>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
<span className="size-1.5 bg-amber-500 rounded-full"></span> Pending Review
                                        </span>
</td>
<td className="px-6 py-4 font-bold text-sm">$0</td>
<td className="px-6 py-4 text-xs text-slate-500">12 hours ago</td>
<td className="px-6 py-4 text-right">
<button className="text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">edit_square</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-500">
<p>Showing 1-10 of 2,430 businesses</p>
<div className="flex gap-2">
<button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
    </>
  );
}
