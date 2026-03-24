
export default function BusinessSettings() {
  return (
    <>
      <div className="mb-8">
<h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
<p className="text-slate-500 dark:text-slate-400 text-lg">Manage your host profile, security, and notification preferences.</p>
</div><div className="border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
<div className="flex gap-8 min-w-max">
<button className="border-b-2 border-primary pb-4 text-primary font-bold text-sm">Profile</button>
<button className="border-b-2 border-transparent pb-4 text-slate-500 hover:text-primary font-bold text-sm transition-colors">Security</button>
<button className="border-b-2 border-transparent pb-4 text-slate-500 hover:text-primary font-bold text-sm transition-colors">Billing</button>
<button className="border-b-2 border-transparent pb-4 text-slate-500 hover:text-primary font-bold text-sm transition-colors">Team Members</button>
<button className="border-b-2 border-transparent pb-4 text-slate-500 hover:text-primary font-bold text-sm transition-colors">Notifications</button>
</div>
</div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/*  Left Column: Forms  */}
<div className="lg:col-span-2 space-y-8">
{/*  Profile Information Section  */}
<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6 text-primary">
<span className="material-symbols-outlined">person</span>
<h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Information</h2>
</div>
<div className="flex flex-col @md:flex-row gap-6 mb-8">
<div className="relative group">
<div className="h-32 w-32 rounded-xl bg-slate-200 dark:bg-slate-800 bg-cover bg-center border-4 border-slate-100 dark:border-slate-800 shadow-md" data-alt="User profile avatar photo" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0Y52aAj_9r9lk-tULoFgqNzTqFSFNBvzZ8M2J-lHcGmNk9Jq64pR_yMhNo2m2KpIWLS7lVDPBHcTloxoyxH_xlKLfPVRlGlh9wfPSmQ2P9bWQX8HQUiypXO7tHQi9DbdCNQVM4xMGLIEyHi1f1hb-B_SNNZyrYrxDcsbvEHCtONiWLsJgyZ2vWZErEyeSYzOEQcHMOk3aotva-ouGgUHlcWPZrn5P_-TEQQ56LleD4CAjjRb6labW-o3-T45uc_rHQ_5N6zjl8W7D')` }}>
<div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
<span className="material-symbols-outlined text-white">photo_camera</span>
</div>
</div>
<button className="mt-3 w-full text-xs font-bold text-primary uppercase tracking-wider hover:underline">Change Avatar</button>
</div>
<div className="flex-1 space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Full Name</label>
<input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" type="text" value="Alex Johnson" />
</div>
<div>
<label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Public Email</label>
<input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" type="email" value="alex.j@staymaster.com" />
</div>
</div>
<div>
<label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Bio</label>
<textarea className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" rows={3}>Professional host with over 10 active listings in the downtown area. Committed to providing 5-star experiences for every guest.</textarea>
<p className="text-xs text-slate-500 mt-2">Brief description for your public host profile. Max 250 characters.</p>
</div>
</div>
</div>
<div className="flex justify-end">
<button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Save Profile Changes</button>
</div>
</section>
{/*  Account Security Section  */}
<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6 text-primary">
<span className="material-symbols-outlined">security</span>
<h2 className="text-xl font-bold text-slate-900 dark:text-white">Account Security</h2>
</div>
<div className="space-y-6">
<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
<div className="flex items-center gap-4">
<div className="p-2 rounded-lg bg-primary/10 text-primary">
<span className="material-symbols-outlined">password</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-white">Password</p>
<p className="text-sm text-slate-500">Last changed 3 months ago</p>
</div>
</div>
<button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Update</button>
</div>
<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
<div className="flex items-center gap-4">
<div className="p-2 rounded-lg bg-green-500/10 text-green-500">
<span className="material-symbols-outlined">verified_user</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication</p>
<p className="text-sm text-slate-500">Currently enabled via SMS ending in ••82</p>
</div>
</div>
<button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Manage</button>
</div>
</div>
</section>
</div>
{/*  Right Column: Preferences  */}
<div className="space-y-8">
{/*  Notification Preferences  */}
<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6 text-primary">
<span className="material-symbols-outlined">notifications_active</span>
<h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
</div>
<div className="space-y-5">
<div className="flex items-start justify-between">
<div>
<p className="text-sm font-bold">New Booking Alerts</p>
<p className="text-xs text-slate-500">Get notified when a new reservation is made.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-start justify-between">
<div>
<p className="text-sm font-bold">Message Notifications</p>
<p className="text-xs text-slate-500">Receive alerts for guest messages.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-start justify-between">
<div>
<p className="text-sm font-bold">Analytics Reports</p>
<p className="text-xs text-slate-500">Weekly performance summary emails.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-start justify-between">
<div>
<p className="text-sm font-bold">Promotional Updates</p>
<p className="text-xs text-slate-500">New features and marketplace tips.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>
{/*  Help/Quick Actions  */}
<section className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 p-6">
<h3 className="font-bold text-slate-900 dark:text-white mb-2">Need Help?</h3>
<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Check our Host Guide for best practices on managing your profile and properties.</p>
<a className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline" href="#">
                        Visit Help Center
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
</a>
</section>
<div className="px-2">
<button className="w-full py-3 rounded-lg border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        Deactivate Account
                    </button>
</div>
</div>
</div>
    </>
  );
}
