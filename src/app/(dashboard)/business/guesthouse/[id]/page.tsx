
export default function MyGuesthouseDetails() {
  return (
    <>
      <div className="max-w-5xl w-full flex flex-col gap-6">
        {/*  Breadcrumbs & Title  */}
        <div className="flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <a className="hover:text-primary transition-colors" href="#">Properties</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Cozy Mountain Guesthouse</span>
          </nav>
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight">Cozy Mountain Guesthouse</h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Manage your property details, amenities, and media from a single place.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined mr-2 text-lg">visibility</span> View Public Listing
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        {/*  Tabs  */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex gap-8 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 border-b-2 border-primary text-primary pb-4 px-2 font-bold whitespace-nowrap">
            <span className="material-symbols-outlined">info</span> General Info
          </button>
          <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-4 px-2 font-medium hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">
            <span className="material-symbols-outlined">pool</span> Amenities
          </button>
          <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-4 px-2 font-medium hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">
            <span className="material-symbols-outlined">gavel</span> House Rules
          </button>
          <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-4 px-2 font-medium hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">
            <span className="material-symbols-outlined">photo_library</span> Photos
          </button>
        </div>
        {/*  Content Section: General Info  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/*  Card: Property Details  */}
            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Property Description
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Property Name</label>
                  <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary w-full" type="text" value="Cozy Mountain Guesthouse" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary w-full" rows={6}>Nestled in the heart of the Blue Ridge Mountains, our guesthouse offers a perfect blend of rustic charm and modern luxury. Ideal for couples seeking a quiet retreat or small families looking for outdoor adventure. Featuring panoramic views, a private deck, and a wood-burning fireplace.</textarea>
                </div>
              </div>
            </section>
            {/*  Card: Location  */}
            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Address</label>
                  <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary w-full" type="text" value="123 Alpine Way" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">City</label>
                  <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary w-full" type="text" value="Asheville" />
                </div>
                <div className="md:col-span-2">
                  <div className="w-full h-48 rounded-lg overflow-hidden relative group">
                    <img className="w-full h-full object-cover" data-alt="Map showing Asheville mountain location" data-location="Asheville" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzOaCvaIkT8_9VqBcuZ7sDXmRwHsDXFf69oYPfEs88iYhxlg8y8CLRVw0WBMjZ36-9QT6fv7ZwaDoC9T-D5fWNusL7iT_AlfsbgYGLYi_UqJBqYyH1o7pHV0JoD72A_cvnQAckdXwITtHZUSZt1fGafla0cofUuxNFSz885BNxuWD2AWlXQxTtvns6o9lVCWlTjjkA_tFXxKMufah4DrYuyoxRE4JelM-aX-2xsNF1wkflWtApibq-Vee7mH-BRn2zexuAJrGvR6wY" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4">
                      <button className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-sm text-primary">map</span> Edit Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-6">
            {/*  Card: Status & Quick Stats  */}
            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Property Status</h3>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                  <span className="size-2 bg-green-500 rounded-full"></span> Active
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Monthly Revenue</span>
                  <span className="font-bold text-slate-900 dark:text-white">$4,250</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Occupancy Rate</span>
                  <span className="font-bold text-slate-900 dark:text-white">84%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Average Rating</span>
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-base">star</span> 4.9 (124)
                  </span>
                </div>
              </div>
            </section>
            {/*  Card: Media Preview  */}
            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Media Preview</h3>
                <a className="text-primary text-xs font-bold hover:underline" href="#">Manage Photos</a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 h-32 rounded-lg overflow-hidden">
                  <img className="w-full h-full object-cover" data-alt="Main exterior of the mountain guesthouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD36666-S6TS41MP_4zfoO8X99S0eDXQ5FdI1cHW2XxHJve6r80oLIJgqzJmJ6KZmRFpQty_AKO-4a2JDTbg1Bjk7cWLky5R_pVYONGEK4sKKtydvRAERr9fxNI1d9X4aVnc23AR-Y1x7xmCBcbaaiK8DMWUpW9fEtZiA9TG77EZW1Wc7CGgrMuEm4yXKhUsPUkT0VU_YjKiMvSyvLx-e335ZH97yhHxUgUl7XYv8BB819ne5RBHs3i76YepJGO4hd8DSMN3Z5LU7_H" />
                </div>
                <div className="h-20 rounded-lg overflow-hidden">
                  <img className="w-full h-full object-cover" data-alt="Modern rustic bedroom interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRL7zysZIrXBEz18h7cCxxtwUaUtjdcyRuB-MrkRF3_4-WdqKM-68cUFAJullBtCMZnOJ-LMCOmyVnlkJm2vs575_gJYw2q0ZK2dFTGSrzpVyCnGMClyQNrU2sTOzpHNrkaGIShPtE3fNv4R2RflI1tszdbl_g9UCMw4wF-l_C4MaHgBqX92COcqd6v-KaAhMWk97MNlrTY1PJxG43jfP28UsB8nMH94dDOHhhJYIokoCz8orkMThafbvvkk2Z5VxnF2pl2noA9QJP" />
                </div>
                <div className="h-20 rounded-lg overflow-hidden relative">
                  <img className="w-full h-full object-cover opacity-60" data-alt="Guesthouse living room with fireplace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGO8OcOQ9vJmu7Nk_nfE3zr7Q_1NBz6yLHFoaf_v6tk0T0EfyjT14ummRLzNiFBywUorUBRjSFwVQsBt_ZXvxtrZbt5AY65hqluhNYqxpcvotokEutvO09T2ffLfrFaH0bpKNvN3Ze90qLtO-RQXTlXnxK44uj8wIekFJZbpJVLmoQ7AX1Ev6Nj979Gtkv3rMiD8TNNVjEGVAGUxx9Fk85x5sabb1PxHqfxByNErENRZ0ABTFU2D8mguPCQEU9eFVbBKG64qDriYy0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">+12</span>
                  </div>
                </div>
              </div>
            </section>
            {/*  Card: Quick Actions  */}
            <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-4">Host Shortcuts</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary transition-all text-left">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <span className="text-sm font-bold">Sync Calendar</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary transition-all text-left">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span className="text-sm font-bold">Update Pricing</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
