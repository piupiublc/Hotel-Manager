import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
      <Link href="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          <span className="material-symbols-outlined">domain</span>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">StayMaster</h1>
          <p className="text-xs text-slate-500 font-medium">Host Portal</p>
        </div>
      </Link>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg active-nav focus:outline-none" href="/business/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none" href="/business/listings">
          <span className="material-symbols-outlined">list_alt</span>
          <span>Listings</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none" href="/business/guesthouse/1">
          <span className="material-symbols-outlined">house</span>
          <span>My Guesthouse</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none" href="/business/payments">
          <span className="material-symbols-outlined">payments</span>
          <span>Payments</span>
        </Link>
        <div className="pt-4 pb-2 px-4">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Support</p>
        </div>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none" href="/business/settings">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none" href="/business/help">
          <span className="material-symbols-outlined">help</span>
          <span>Help Center</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <img alt="Profile" className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwnFu3N7OkWsyw1iQp-HTRsccmgwpR98fWkDLIqLKwGtCVZ3oJKn6TRrkipFHu7BPdpaCPTPi4y6qYlnyzLQls-x0nX3BlOSspFIRB9tY8ONWSRGJrte_IpIynV2Q5eEhNgVcE1A62YINkQ8NiMX5geVqXHvH1Pat-3dpQEa_fSFEXUbQnshOgJbSYHnqtrMIYoBW0eG8tm3Y_LuWIMnxR5lzRSL0CQmF4nTofrVulramQiPO-7uX4oA6_fOP264jkBkPrUS8SL38"/>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-xs text-slate-500 truncate">Premium Host</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">unfold_more</span>
        </div>
      </div>
    </aside>
  );
}
