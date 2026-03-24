
export default function AdminFinanceOverview() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">account_balance_wallet</span>
</div>
<span className="text-emerald-600 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-xs mr-1">trending_up</span>+12.5%
                    </span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Payouts</p>
<p className="text-2xl font-extrabold text-on-surface">$1,429,000</p>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">monetization_on</span>
</div>
<span className="text-emerald-600 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-xs mr-1">trending_up</span>+8.2%
                    </span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Net Profit</p>
<p className="text-2xl font-extrabold text-on-surface">$342,800</p>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<span className="text-amber-600 text-xs font-bold flex items-center bg-amber-50 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-xs mr-1">trending_flat</span>0.4%
                    </span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Commission Rev</p>
<p className="text-2xl font-extrabold text-on-surface">$112,450</p>
</div>
<div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">percent</span>
</div>
<span className="text-red-600 text-xs font-bold flex items-center bg-red-50 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-xs mr-1">trending_down</span>-2.1%
                    </span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Fee Margin</p>
<p className="text-2xl font-extrabold text-on-surface">14.8%</p>
</div>
</div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
{/*  Monthly Trend Chart Placeholder  */}
<div className="lg:col-span-2 bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/50">
<div className="flex justify-between items-center mb-8">
<h3 className="text-lg font-bold text-on-surface">Monthly Financial Trend</h3>
<div className="flex gap-2">
<button className="text-xs px-3 py-1 bg-slate-100 rounded-full font-bold text-slate-600">6 Months</button>
<button className="text-xs px-3 py-1 bg-primary text-white rounded-full font-bold">1 Year</button>
</div>
</div>
<div className="h-64 flex items-end justify-between gap-4 px-4">
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-32">
<div className="absolute bottom-0 w-full bg-primary/20 h-24 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-12 rounded-t-lg transition-all group-hover:h-16"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">JAN</span>
</div>
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-40">
<div className="absolute bottom-0 w-full bg-primary/20 h-32 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-20 rounded-t-lg transition-all group-hover:h-24"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">FEB</span>
</div>
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-48">
<div className="absolute bottom-0 w-full bg-primary/20 h-40 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-28 rounded-t-lg transition-all group-hover:h-32"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">MAR</span>
</div>
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-56">
<div className="absolute bottom-0 w-full bg-primary/20 h-44 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-36 rounded-t-lg transition-all group-hover:h-40"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">APR</span>
</div>
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-52">
<div className="absolute bottom-0 w-full bg-primary/20 h-40 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-32 rounded-t-lg transition-all group-hover:h-36"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">MAY</span>
</div>
<div className="flex flex-col items-center gap-2 w-full">
<div className="w-full bg-slate-100 rounded-t-lg relative group h-60">
<div className="absolute bottom-0 w-full bg-primary/20 h-52 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-primary h-44 rounded-t-lg transition-all group-hover:h-48"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">JUN</span>
</div>
</div>
</div>
{/*  Revenue Split  */}
<div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/50">
<h3 className="text-lg font-bold text-on-surface mb-8">Revenue Breakdown</h3>
<div className="space-y-6">
<div>
<div className="flex justify-between text-xs font-bold mb-2">
<span className="text-on-surface-variant">BOOKING COMMISSIONS</span>
<span className="text-on-surface">65%</span>
</div>
<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[65%]"></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-bold mb-2">
<span className="text-on-surface-variant">SERVICE FEES</span>
<span className="text-on-surface">25%</span>
</div>
<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full w-[25%]"></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-bold mb-2">
<span className="text-on-surface-variant">PREMIUM LISTINGS</span>
<span className="text-on-surface">10%</span>
</div>
<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-[10%]"></div>
</div>
</div>
</div>
<div className="mt-8 pt-8 border-t border-slate-100">
<div className="flex items-center gap-4">
<div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">trending_up</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-bold">LIFETIME REVENUE</p>
<p className="text-xl font-extrabold text-on-surface">$12.4M</p>
</div>
</div>
</div>
</div>
</div><section className="bg-surface rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
<div className="p-6 border-b border-slate-100 flex justify-between items-center">
<h3 className="text-lg font-bold text-on-surface">Transaction Ledger</h3>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span> Filter
                    </button>
<button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
<span className="material-symbols-outlined text-sm">download</span> Export CSV
                    </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold">
<th className="px-6 py-4">Transaction ID</th>
<th className="px-6 py-4">Date</th>
<th className="px-6 py-4">Business / Host</th>
<th className="px-6 py-4">Amount</th>
<th className="px-6 py-4">Platform Fee (3%)</th>
<th className="px-6 py-4">Commission (12%)</th>
<th className="px-6 py-4">Net Payout</th>
<th className="px-6 py-4">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 text-sm">
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-92834-BR</td>
<td className="px-6 py-4 text-slate-600">Oct 24, 2023</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">RH</div>
<span className="font-bold text-on-surface">Riverfront Heights</span>
</div>
</td>
<td className="px-6 py-4 font-bold">$4,200.00</td>
<td className="px-6 py-4 text-slate-500">$126.00</td>
<td className="px-6 py-4 text-slate-500">$504.00</td>
<td className="px-6 py-4 font-extrabold text-primary">$3,570.00</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Completed</span>
</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-92835-LP</td>
<td className="px-6 py-4 text-slate-600">Oct 24, 2023</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">LP</div>
<span className="font-bold text-on-surface">Luxe Penthouse</span>
</div>
</td>
<td className="px-6 py-4 font-bold">$12,500.00</td>
<td className="px-6 py-4 text-slate-500">$375.00</td>
<td className="px-6 py-4 text-slate-500">$1,500.00</td>
<td className="px-6 py-4 font-extrabold text-primary">$10,625.00</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase">Pending</span>
</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-92836-SC</td>
<td className="px-6 py-4 text-slate-600">Oct 23, 2023</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">SC</div>
<span className="font-bold text-on-surface">Sunset Cabins</span>
</div>
</td>
<td className="px-6 py-4 font-bold">$1,850.00</td>
<td className="px-6 py-4 text-slate-500">$55.50</td>
<td className="px-6 py-4 text-slate-500">$222.00</td>
<td className="px-6 py-4 font-extrabold text-primary">$1,572.50</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Completed</span>
</td>
</tr>
<tr className="hover:bg-slate-50/50 transition-colors">
<td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-92837-GH</td>
<td className="px-6 py-4 text-slate-600">Oct 23, 2023</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">GH</div>
<span className="font-bold text-on-surface">Glass House Villa</span>
</div>
</td>
<td className="px-6 py-4 font-bold">$6,700.00</td>
<td className="px-6 py-4 text-slate-500">$201.00</td>
<td className="px-6 py-4 text-slate-500">$804.00</td>
<td className="px-6 py-4 font-extrabold text-primary">$5,695.00</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">Refunded</span>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
<p className="text-xs text-slate-500 font-bold">Showing 1 to 4 of 245 transactions</p>
<div className="flex gap-2">
<button className="px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-slate-50">Previous</button>
<button className="px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-slate-50">Next</button>
</div>
</div>
</section>
    </>
  );
}
