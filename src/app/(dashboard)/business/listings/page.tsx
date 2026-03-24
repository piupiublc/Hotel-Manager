
export default function BusinessListings() {
  return (
    <>
<section className="flex-1 p-4 md:p-8 space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="space-y-1">
<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Property Listings</h1>
<p className="text-slate-500 dark:text-slate-400">Manage your real estate portfolio and track performance</p>
</div>
<button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
<span className="material-symbols-outlined text-[20px]">add</span>
<span>Create New Listing</span>
</button>
</div>
<div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 overflow-x-auto">
<a className="pb-3 border-b-2 border-primary text-primary font-bold whitespace-nowrap" href="#">All Listings (12)</a>
<a className="pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold whitespace-nowrap" href="#">Online (8)</a>
<a className="pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold whitespace-nowrap" href="#">Drafts (4)</a>
<a className="pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold whitespace-nowrap" href="#">Archived</a>
</div>
<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Property</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Price / Night</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Occupancy</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="h-14 w-14 rounded-lg bg-center bg-cover border border-slate-200 dark:border-slate-700" data-alt="Modern luxury villa with pool thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDI0m1jLztX70nfGHt7KEnKoiJarfir0wbQ8YH66kXv_oL_dcHJg9W9dMbIHSPlipLmb0IprD0nzodcAfNStEqfT10ZpFrnWosmJe14KwRsCcRAJyMbkWBhzmiA3rztDGGFwhWmz37vGrzdCgu2mqiV0nc5kvvi4xE5j1eWXp-LznWwXyAvMVtX7aLHgdNLaD7XJJ1H1ieNTyN-IKBydGpeacwsXQK-4BbYcCtuZ7qovRuDX7b2s6n41gbpF9Ozh0Rql4rAD4ffcxCX')" }}></div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Luxury Sunset Villa</p>
<p className="text-xs text-slate-500 dark:text-slate-400">Malibu, California</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Online
                                            </span>
</td>
<td className="px-6 py-4">
<p className="font-bold text-slate-900 dark:text-slate-100">$450</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%]"></div>
</div>
<span className="text-xs font-semibold text-slate-600 dark:text-slate-400">85%</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="h-14 w-14 rounded-lg bg-center bg-cover border border-slate-200 dark:border-slate-700" data-alt="Minimalist urban loft apartment interior" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMo9bvYkN4tXaK68mX7R5LMtd1406E0t4uNT_xm_dZPA07eLH1V6VwQ08_Xb_AmGOp33WE1_hDmCUZmZCc3DhlyxAWPeAbat6ldsdN6_LoMdHBF5r-KKCNzJXqZDyYVes1Nxmv44X5oMMNTOmIadX8CL7mQknFI07RAaUpEbnRJMOvKG4jtWxyUnHnILyN4BQqydscWrYTkxVhzQKqRo-A7xhXCd6RypVtcPQWz1SRWg8Is-yIzbFjeJBbpgqugtN-GBglrOgooh4i')" }}></div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Urban Loft Downtown</p>
<p className="text-xs text-slate-500 dark:text-slate-400">New York, NY</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                                Draft
                                            </span>
</td>
<td className="px-6 py-4">
<p className="font-bold text-slate-900 dark:text-slate-100">$210</p>
</td>
<td className="px-6 py-4">
<p className="text-xs text-slate-400 font-medium italic">Pending Activation</p>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="h-14 w-14 rounded-lg bg-center bg-cover border border-slate-200 dark:border-slate-700" data-alt="Cozy mountain cabin in snow" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwKdS9AihNZJMTe47cAxEit9OYX7u30sRhkZeTDBrZRxe6ZHZHbKO2vGdd6akmpD6Jq6gLA2vw7OFGdo-f-aqz0SslcD5g7Xj4Fs_kceE5WDGpUhu_Eb_w4KlJYxwa39YHqYLi0E1YD9HjsZwU1yHmBOH2MwCRH06y3DNSOjUkGdJR9Ujp95oqvmMLiUk-acBVjePjBbqeT66dqiMjE2y7p1T-7s2rDIavenQI5kOe-VKYeK8VhMET6NBDe6NoBM8RGpINgfiEbDQl')" }}></div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Alpine Retreat Cabin</p>
<p className="text-xs text-slate-500 dark:text-slate-400">Aspen, CO</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Online
                                            </span>
</td>
<td className="px-6 py-4">
<p className="font-bold text-slate-900 dark:text-slate-100">$325</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[62%]"></div>
</div>
<span className="text-xs font-semibold text-slate-600 dark:text-slate-400">62%</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="h-14 w-14 rounded-lg bg-center bg-cover border border-slate-200 dark:border-slate-700" data-alt="Beachfront cottage with blue shutters" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7XjnH05RNi9LZCS7uyn1FxgGs_WqbexSB6ExXwDpdoYVRGadByfbh7GCTG97_CDudBCj4X2g_HJ73OaQtd5Ao_vWvqjKZXfI_gnbW489fpk-GqWvBpRH25Tg4DAX44BAkgoxbMsZuj0M-QMfweJxeAyrBXTlYO64pvnYWSntXf2CbfzvO8Qxe3FF-rt-p8BnF5BoNiexllpyOdEr2AzI5KI5JnC89zCRzLtbhDpbdHXvAMOz0Pf0g_GdSF6NGnscddCTOSWYds-n_')" }}></div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Seaside Cottage</p>
<p className="text-xs text-slate-500 dark:text-slate-400">Maui, HI</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Online
                                            </span>
</td>
<td className="px-6 py-4">
<p className="font-bold text-slate-900 dark:text-slate-100">$185</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[94%]"></div>
</div>
<span className="text-xs font-semibold text-slate-600 dark:text-slate-400">94%</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
<p className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 4 of 12 properties</p>
<div className="flex gap-2">
<button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm font-semibold hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Previous</button>
<button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-sm font-semibold hover:bg-white dark:hover:bg-slate-800 transition-colors">Next</button>
</div>
</div>
</div>
</section>
    </>
  );
}
