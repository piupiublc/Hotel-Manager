export default function BusinessDashboard() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Manage your properties and monitor real-time performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-2xl font-black mt-1">$42,850.00</h3>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+4.2%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Bookings</p>
          <h3 className="text-2xl font-black mt-1">156</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">bed</span>
            </div>
            <span className="text-xs font-bold text-slate-500 flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full">Stable</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Occupancy Rate</p>
          <h3 className="text-2xl font-black mt-1">84.2%</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">star</span>
            </div>
            <span className="text-xs font-bold text-rose-500 flex items-center bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-full">-0.4%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg. Rating</p>
          <h3 className="text-2xl font-black mt-1">4.85</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold">Active Listings</h4>
            <a className="text-primary text-sm font-bold hover:underline" href="#">View All</a>
          </div>
          <div className="space-y-4">
            {/* Listing 1 */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
              <div className="w-40 h-28 flex-shrink-0 bg-slate-200 rounded-xl overflow-hidden">
                <img alt="Hotel" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBmhMgJN3PG3p7p-C4FFxXVLXWFfu8ojxVTZTtO-OP_5_r71o-U5cgaTAu2tVHZh9b8vVWBYwDbLG0cj3_SV2hlLgIkFxIkLOZnJIQgMHQ2WbamGps0Oqd3AXahKXBOXGZ_b4q4w5u6dYHZYeFM8_eOvFAMFWuaKfn36Q-kumMmjDkIZdGRXlmY5NQ3qaVQOAsMJCaUhgCLVKffgBHva5IwyQkCrScsNL7nMnQTWv6GUfG_7BADYRvPt2hRqV-sGgkGHQAV6BJaDCE"/>
              </div>
              <div className="flex-1 py-1">
                <div className="flex justify-between">
                  <h5 className="text-lg font-bold">Azure Bay Resort & Spa</h5>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider h-fit">Online</span>
                </div>
                <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Malibu, California
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rate</p>
                    <p className="text-sm font-bold">$240/night</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bookings</p>
                    <p className="text-sm font-bold">42 this month</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rev.</p>
                    <p className="text-sm font-bold text-primary">$10,080</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between py-1">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
                  Edit
                </button>
              </div>
            </div>
            
            {/* Listing 2 */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
              <div className="w-40 h-28 flex-shrink-0 bg-slate-200 rounded-xl overflow-hidden">
                <img alt="Hotel" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw0nqOVmyOGwt0qRdjGd8oUsxUlX1ZF0-sHlfUKVEigKXN6FR43vikjdGBTv1Og_pb4ii_kWGabB5hCw0jAfm-ylMr-kpaR-T5jNckVc4BpaWCC2xjb4FQPBaIaEaoPTWlQckaEhKvsLuDxsNRsxGl0NB_9Jfv3rZjWbiMEaakeBhR4UtAis8POnS481aJ05pXUzwkCfgDl20RNq9UYLibVWe71wbgIapA3xN8MB44dSl2hWkNdke-KzT0LDXM4p-NKn0DLJP3Awv5"/>
              </div>
              <div className="flex-1 py-1">
                <div className="flex justify-between">
                  <h5 className="text-lg font-bold">The Urban Loft Guesthouse</h5>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider h-fit">Online</span>
                </div>
                <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Downtown Chicago, IL
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rate</p>
                    <p className="text-sm font-bold">$185/night</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bookings</p>
                    <p className="text-sm font-bold">31 this month</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rev.</p>
                    <p className="text-sm font-bold text-primary">$5,735</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between py-1">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Recent Bookings</h4>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <img alt="Guest" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkC8OsuhNZnbViW6nWGhtR1YbJL2I-ZPsbk00f0HP3UisjDrZb9IV7nIExFENqSTbWkMaT6iu2rDjERmKXXT-Q9dmTzUC-06D2aT0Y1NYdWXntgGUGw4QJROEzyTnhWizjn1NrF3HxhmFzipBIWO2rBrL2cTep9PoE_0d1FwLif6ckbcIM7bAk7FkQlg07AX16WFfU4a-uNg3ejRTBxjl2YGiqE1md_XNp-v1Dzvv12K90I6jfeyN46Rj0YbSF6bQ8c9y-PjzFHtPO"/>
                <div className="flex-1">
                  <p className="text-sm font-bold">Marcus Thorne</p>
                  <p className="text-xs text-slate-500">2 nights • $480 total</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">Confirmed</span>
              </div>
              
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <img alt="Guest" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvf3ZzFcK9R91i5-NU7Hs_tCo7pnaLqCaXC8_Twig2ycpsEJbS-GNtRA-Tq21Qr9d-NuKiqEzZrbzZT_rF03qhELgRP_ObW7cxc-4qAK9_rfU0tFkeb-kvZ_UG0AL9b-rN1bV5Xceu7e4bcfbaBnjAZGOCf2vrUlSezTBMsKLEwmnWhDuv4Q0ak82iIY7-KXi5pWLm9lWabkDjcWML3YouIknO2MSzP39BRokG1ejclDeRJqK9Ohh9LQsNQ9r5Ju5p_vH1HvFzyUDr"/>
                <div className="flex-1">
                  <p className="text-sm font-bold">Sarah Jenkins</p>
                  <p className="text-xs text-slate-500">5 nights • $1,200 total</p>
                </div>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">Pending</span>
              </div>
              
              <div className="p-4 flex items-center gap-4">
                <img alt="Guest" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLknbSINGGBdJmovxDPIDqaba1i9KVua1RRt9ED6Tm8hNL_L5HOpWLFZdJW0Z_-y3Ov_qKC6oHDMmKdHVZfDGj_QM39tVRZwlnDqucjdYOWZBkExKjUzD80CAwl1axCnJ6Zy4ftCxq_N8ZE9S_TsVNhXSHKTTwMwngkNn10PbO_gIYCGxlvDtMadJ1ux6ETu4mdiITDrntGKZF3Lg5o19cEcl4tujaZwHoQUYZc_2bWnEpc66RnL0GhS22lspoi_ZWknCDaxKTxrYj"/>
                <div className="flex-1">
                  <p className="text-sm font-bold">David Chen</p>
                  <p className="text-xs text-slate-500">1 night • $240 total</p>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/40 px-2 py-1 rounded">Checked In</span>
              </div>
              
              <button className="w-full py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800">
                View All Bookings
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Properties Location</h4>
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
                <div className="w-full h-full opacity-60 bg-[radial-gradient(#135bec_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white animate-pulse"></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full border-2 border-white animate-pulse"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg text-[10px] font-bold shadow-xl">
                2 Properties Active
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 lg:hidden">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  );
}
