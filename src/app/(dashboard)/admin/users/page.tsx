
export default function AdminUserManagement() {
  return (
    <>
      <div className="p-8 max-w-[1400px] mx-auto">
{/*  Executive Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<nav className="flex text-xs font-bold text-primary tracking-widest uppercase mb-2">
<span>Management</span>
<span className="mx-2 text-slate-300">/</span>
<span className="text-slate-400">Directory</span>
</nav>
<h1 className="text-[30px] font-extrabold tracking-tighter text-on-surface">User Management</h1>
<p className="text-on-surface-variant text-sm mt-1">Review, manage, and monitor account health across the ecosystem.</p>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Export CSV
                    </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm">
<span className="material-symbols-outlined text-[18px]">person_add</span>
                        Create Account
                    </button>
</div>
</div>
{/*  Metric Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
<div className="flex items-start justify-between">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">group</span>
</div>
<span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            +12.5% <span className="material-symbols-outlined text-[14px]">trending_up</span>
</span>
</div>
<div className="mt-4">
<h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Active Users</h3>
<p className="text-2xl font-extrabold mt-1">24,892</p>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
<div className="flex items-start justify-between">
<div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
<span className="material-symbols-outlined">verified_user</span>
</div>
<span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            +4.2% <span className="material-symbols-outlined text-[14px]">trending_up</span>
</span>
</div>
<div className="mt-4">
<h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Business Owners</h3>
<p className="text-2xl font-extrabold mt-1">1,402</p>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
<div className="flex items-start justify-between">
<div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
<span className="material-symbols-outlined">history</span>
</div>
<span className="flex items-center gap-1 text-[12px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Steady
                        </span>
</div>
<div className="mt-4">
<h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Avg. Session Time</h3>
<p className="text-2xl font-extrabold mt-1">12m 44s</p>
</div>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
<div className="flex items-start justify-between">
<div className="p-2 bg-error/10 rounded-lg text-error">
<span className="material-symbols-outlined">person_off</span>
</div>
<span className="flex items-center gap-1 text-[12px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            -2.1% <span className="material-symbols-outlined text-[14px]">trending_down</span>
</span>
</div>
<div className="mt-4">
<h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Churn Rate (MoM)</h3>
<p className="text-2xl font-extrabold mt-1">0.84%</p>
</div>
</div>
</div>
{/*  Table Section  */}
<div className="bg-surface rounded-xl shadow-sm border border-slate-100 overflow-hidden">
<div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-4">
<button className="px-4 py-2 text-sm font-bold bg-slate-100 text-on-surface rounded-lg">All Users</button>
<button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-on-surface transition-colors">Business Owners</button>
<button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-on-surface transition-colors">Customers</button>
</div>
<div className="flex items-center gap-3">
<div className="relative group">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
</span>
<select className="appearance-none bg-surface-container border-none text-xs font-bold rounded-lg py-2 pl-9 pr-8 focus:ring-2 focus:ring-primary/50 cursor-pointer">
<option>Sort by: Newest First</option>
<option>Sort by: Oldest First</option>
<option>Sort by: Active State</option>
</select>
</div>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50/50">
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100">User Profile</th>
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100">Account Type</th>
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100">Join Date</th>
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100">Status</th>
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100">Last Activity</th>
<th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">
{/*  User Row 1  */}
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
<img alt="Marcus Chen" data-alt="Portrait of a smiling professional man with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQEXTpstYF5iJzVifiwM6EZGoXTi4Ak-w3ddsPwjSgGuk8lXD5zlQgf9Ky9KSAJ5sdoAfViSJhRHZAkzWbNBYoou3aHUoM0viVqhQ0aekmcZSpbuJaR0k8Er8MzRZ2INhOurZmpbQWYSNBMZKaAksC34lS8iuDigp635OeKAUPYK62V9NNx4D6fbZoNRje8H2MiW29EfxEbWquoJashCacLAoqxgAZFq3c0kUTpuFxIb8lcVjYJnoFBGOsptjzK1KJ1ZB9XD6jFU1A" />
</div>
<div>
<p className="text-sm font-bold text-on-surface">Marcus Chen</p>
<p className="text-xs text-slate-400">marcus.c@example.com</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full w-fit">
<span className="material-symbols-outlined text-[14px]">storefront</span>
                                        Business Owner
                                    </span>
</td>
<td className="px-6 py-4 text-sm text-slate-600">Oct 12, 2023</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
<span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Active
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm text-slate-600">2 hours ago</p>
<p className="text-[10px] text-slate-400 font-medium">Dashboard Access</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</td>
</tr>
{/*  User Row 2  */}
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
<img alt="Sarah Jenkins" data-alt="Portrait of a professional woman with a warm expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKROqg23zm3UW2pTSz5l1Uhg7heeXM_BKfAcLEUpfvj_aFmW8d0R8NJiucm3goi9OB7aW83htKOh6dWLRBYcmhIaKb0BsA8jjozvdgwp9974qXZlA0fWz438Wm-naarKQsCR3TpM4RVS8QhoAWdzgq_OUEdcqwIVA0l1z1ZUcJn705FIhw4IbGEhATLvBYnE95S4MigVmUrR6-UGOxtrb_EEL7djGTezJt-RU49GuXN0QAJs4h8VzgsCkfgVmKfK6k3ZQ9w8L68nOF" />
</div>
<div>
<p className="text-sm font-bold text-on-surface">Sarah Jenkins</p>
<p className="text-xs text-slate-400">s.jenkins@test.com</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
<span className="material-symbols-outlined text-[14px]">person</span>
                                        Customer
                                    </span>
</td>
<td className="px-6 py-4 text-sm text-slate-600">Jan 05, 2024</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
<span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Active
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm text-slate-600">48 mins ago</p>
<p className="text-[10px] text-slate-400 font-medium">Search: "Maldives Resorts"</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</td>
</tr>
{/*  User Row 3  */}
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
<img alt="Elena Rodriguez" data-alt="Portrait of a young man looking directly at the camera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNBVr9a4xHOWAndymOrwZjS3xv7sAw-g7oydBhL9nTKB1VHYczai5nlwy_FBDqKIi8NKlaSiz9aESXx2EPVuIi0B0pz3AVMt0QEqRjgAw7vJwfkgvpNHNxWoy60o0d8-Pk4gnFrm8hn2RTlMMBVQMO-elW6l44lzMJ2YiRvL5rdaQpPM1PvJeFa5RM83dGkALfjd2_BEWAlmozwsxuj1_JpONyVLqev0kAUyKcCXoXjW3EyXV472tdPRY9KJmmGjNWNmRvTDYahkHw" />
</div>
<div>
<p className="text-sm font-bold text-on-surface">Alex Rivera</p>
<p className="text-xs text-slate-400">arivera@business.net</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full w-fit">
<span className="material-symbols-outlined text-[14px]">storefront</span>
                                        Business Owner
                                    </span>
</td>
<td className="px-6 py-4 text-sm text-slate-600">Nov 22, 2023</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
<span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                        Inactive
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm text-slate-600">6 days ago</p>
<p className="text-[10px] text-slate-400 font-medium">Logged out</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</td>
</tr>
{/*  User Row 4  */}
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
<img alt="Taylor Swift" data-alt="Portrait of a professional young woman with stylish hair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2x6OxCBX2Oaz-MbfECEfx6OceaNHZw6lG1AxwbbcHfuRQFWn0WB4AYFNOcGOW3sf0QuJdScg2rmZ0areXy-T8oM0kiaO6zf7H2x3TYbqLn2fUrOmqAQcFGpgiXziha_miD0X5AMBU8S_PfpCQ96w02SiPMp2pOMOg7jwwXbGwYxDShchocgvvHc_rAepQpT4vRt-jII7efBN0FxEYH21zlqStLfRhuLssmla0UqykZSz9XKDf34xxUwnl9lCTCpmmMetZfojmDugK" />
</div>
<div>
<p className="text-sm font-bold text-on-surface">Sophia Wong</p>
<p className="text-xs text-slate-400">sophia.wong@travel.io</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
<span className="material-symbols-outlined text-[14px]">person</span>
                                        Customer
                                    </span>
</td>
<td className="px-6 py-4 text-sm text-slate-600">Feb 14, 2024</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
<span className="h-2 w-2 rounded-full bg-red-500"></span>
                                        Suspended
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm text-slate-600">12 days ago</p>
<p className="text-[10px] text-slate-400 font-medium">Policy Violation Flag</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
<p className="text-xs font-medium text-slate-500">Showing 1 to 4 of 24,892 results</p>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
<button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-white transition-colors bg-white shadow-sm text-primary">1</button>
<button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-white transition-colors">2</button>
<button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-white transition-colors">3</button>
<span className="text-slate-400 mx-1">...</span>
<button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-white transition-colors">Next</button>
</div>
</div>
</div>
{/*  Visual Insight Section: Glassmorphic Chart Area  */}
<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  User Growth Graph Simulation  */}
<div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
<div className="flex items-center justify-between mb-8">
<div>
<h3 className="text-sm font-extrabold text-on-surface">User Acquisition Growth</h3>
<p className="text-xs text-slate-400">Monthly trend across all account types</p>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2">
<span className="h-2 w-2 rounded-full bg-primary"></span>
<span className="text-[10px] font-bold uppercase text-slate-500">Owners</span>
</div>
<div className="flex items-center gap-2">
<span className="h-2 w-2 rounded-full bg-tertiary"></span>
<span className="text-[10px] font-bold uppercase text-slate-500">Customers</span>
</div>
</div>
</div>
<div className="h-48 flex items-end justify-between gap-4 px-2">
{/*  Bar chart visualization  */}
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm relative h-12">
<div className="absolute bottom-0 w-full bg-primary/40 h-8 rounded-t-sm"></div>
</div>
<span className="text-[10px] text-slate-400 font-bold">JAN</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm relative h-20">
<div className="absolute bottom-0 w-full bg-primary/40 h-14 rounded-t-sm"></div>
</div>
<span className="text-[10px] text-slate-400 font-bold">FEB</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm relative h-28">
<div className="absolute bottom-0 w-full bg-primary/40 h-22 rounded-t-sm"></div>
</div>
<span className="text-[10px] text-slate-400 font-bold">MAR</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm relative h-32">
<div className="absolute bottom-0 w-full bg-primary/40 h-26 rounded-t-sm"></div>
</div>
<span className="text-[10px] text-slate-400 font-bold">APR</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm relative h-24">
<div className="absolute bottom-0 w-full bg-primary/40 h-18 rounded-t-sm"></div>
</div>
<span className="text-[10px] text-slate-400 font-bold">MAY</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-primary rounded-t-sm h-40"></div>
<span className="text-[10px] text-primary font-extrabold">JUN</span>
</div>
<div className="w-full flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-sm h-10"></div>
<span className="text-[10px] text-slate-400 font-bold">JUL</span>
</div>
</div>
</div>
{/*  Status Distribution  */}
<div className="bg-surface p-6 rounded-xl border border-slate-100 shadow-sm">
<h3 className="text-sm font-extrabold text-on-surface mb-6">Device Distribution</h3>
<div className="space-y-4">
<div className="flex items-center justify-between text-xs">
<span className="font-bold text-slate-500">Mobile App (iOS/Android)</span>
<span className="font-bold text-on-surface">64%</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-primary w-[64%]"></div>
</div>
<div className="flex items-center justify-between text-xs pt-2">
<span className="font-bold text-slate-500">Web Dashboard</span>
<span className="font-bold text-on-surface">28%</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[28%]"></div>
</div>
<div className="flex items-center justify-between text-xs pt-2">
<span className="font-bold text-slate-500">API/Partners</span>
<span className="font-bold text-on-surface">8%</span>
</div>
<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
<div className="h-full bg-slate-300 w-[8%]"></div>
</div>
</div>
<div className="mt-10 p-4 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
<div className="flex items-center gap-3 text-slate-500">
<span className="material-symbols-outlined text-[20px]">lightbulb</span>
<p className="text-[11px] leading-relaxed">
<span className="font-bold text-on-surface">Insight:</span> Mobile users are 3x more likely to complete a booking within the first 24h of registration.
                            </p>
</div>
</div>
</div>
</div>
</div>
    </>
  );
}
