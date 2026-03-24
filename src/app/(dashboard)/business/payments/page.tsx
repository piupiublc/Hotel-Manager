
export default function BusinessPaymentsEarnings() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
{/*  Header Section  */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Payments & Earnings</h1>
<p className="text-slate-500 dark:text-slate-400 mt-1">Track your income and manage your payout settings.</p>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
<span className="material-symbols-outlined text-[20px]">download</span>
                            Export CSV
                        </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-[20px]">account_balance</span>
                            Payout Settings
                        </button>
</div>
</div>
{/*  Metrics Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
<span className="material-symbols-outlined">trending_up</span>
</div>
<span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12.5%</span>
</div>
<p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earnings (This Month)</p>
<p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">$12,850.40</p>
</div>
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
<span className="material-symbols-outlined">hourglass_empty</span>
</div>
<span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">Updated 2h ago</span>
</div>
<p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payouts</p>
<p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">$3,420.00</p>
</div>
<div className="bg-primary p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/10 flex flex-col justify-between">
<div>
<p className="text-sm font-medium text-primary-foreground/80 text-white/80">Available Balance</p>
<p className="text-3xl font-bold text-white mt-1 tracking-tight">$8,102.50</p>
</div>
<button className="mt-4 w-full py-2 bg-white text-primary rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
                            Request Instant Payout
                        </button>
</div>
</div>
{/*  Transaction Table Section  */}
<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
<div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<h2 className="text-lg font-bold text-slate-900 dark:text-white">Transaction History</h2>
<div className="flex items-center gap-2">
<div className="relative">
<select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-primary focus:border-primary">
<option>Last 30 Days</option>
<option>Last 90 Days</option>
<option>2023 Full Year</option>
<option>Custom Range</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2 text-[18px] pointer-events-none text-slate-400">expand_more</span>
</div>
<button className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-all">
<span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-400">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 dark:bg-slate-800/50">
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
{/*  Row 1  */}
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 24, 2023</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-88421</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Modern Villa, Bali</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">$1,250.00</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
<span className="size-1.5 rounded-full bg-green-500"></span>
                                            Completed
                                        </span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
<button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 23, 2023</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-88392</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Urban Loft, NYC</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">$840.50</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
<span className="size-1.5 rounded-full bg-amber-500"></span>
                                            Pending
                                        </span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
<button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 21, 2023</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-88120</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Seaside Cottage</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">$450.00</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
<span className="size-1.5 rounded-full bg-green-500"></span>
                                            Completed
                                        </span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
<button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 19, 2023</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-87980</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Mountain Cabin</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">$1,100.00</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
<span className="size-1.5 rounded-full bg-slate-400"></span>
                                            Refunded
                                        </span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
<button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
</td>
</tr>
{/*  Row 5  */}
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 18, 2023</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-87551</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Downtown Studio</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">$320.00</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
<span className="size-1.5 rounded-full bg-green-500"></span>
                                            Completed
                                        </span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
<button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
<p className="text-xs text-slate-500 font-medium">Showing 1 to 5 of 24 transactions</p>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-50" disabled>Previous</button>
<button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700">Next</button>
</div>
</div>
</div>
{/*  Footer Summary info  */}
<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
<h3 className="font-bold text-slate-900 dark:text-white mb-4">Earnings Breakdown</h3>
<div className="space-y-4">
<div className="flex items-center justify-between">
<span className="text-sm text-slate-500">Accommodation Fees</span>
<span className="text-sm font-bold">$14,200.00</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-slate-500">Cleaning Fees</span>
<span className="text-sm font-bold">$1,450.00</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-blue-400 h-full rounded-full" style={{ width: "10%" }}></div>
</div>
<div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
<span className="text-sm font-bold text-slate-900 dark:text-white">StayMaster Commission (3%)</span>
<span className="text-sm font-bold text-red-500">-$469.50</span>
</div>
</div>
</div>
<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center">
<div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
<span className="material-symbols-outlined text-[32px]">support_agent</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white">Need help with payouts?</h3>
<p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-2">Our financial support team is available 24/7 to assist with reconciliation and tax documents.</p>
<button className="mt-4 px-6 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/5 transition-all">
                            Contact Support
                        </button>
</div>
</div>
</div>
    </>
  );
}
