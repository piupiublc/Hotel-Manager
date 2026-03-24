import Link from "next/link";

export default function LoginRegistration() {
  return (
    <>
      
<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-20 py-4">
<Link href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
<div className="size-8">
<svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fillRule="evenodd"></path>
</svg>
</div>
<h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">StayMaster</h2>
</Link>
<div className="flex items-center gap-4">
<button className="hidden sm:flex text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary">Help Center</button>
<button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal">
<span>Sign In</span>
</button>
</div>
</header>
<main className="flex-1 flex items-center justify-center p-6 sm:p-12">
<div className="w-full max-w-[520px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
<div className="p-8 border-b border-slate-200 dark:border-slate-800">
<h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">Join StayMaster</h1>
<p className="text-slate-500 dark:text-slate-400">Experience seamless stay management today.</p>
</div>
<div className="p-8">
<div className="mb-8">
<p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Account Type</p>
<div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
<label className="flex-1 cursor-pointer">
<input checked className="hidden peer" name="account_type" type="radio" value="customer" />
<div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-500 dark:text-slate-400">
                                        Customer
                                    </div>
</label>
<label className="flex-1 cursor-pointer">
<input className="hidden peer" name="account_type" type="radio" value="business" />
<div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-500 dark:text-slate-400">
                                        Business
                                    </div>
</label>
</div>
</div>
{/*  Customer Form  */}
<div className="space-y-5" id="customer-form">
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John Doe" type="text" />
</div>
</div>
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" type="email" />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+1 (555) 000-0000" type="tel" />
</div>
</div>
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="••••••••" type="password" />
</div>
</div>
</div>
<button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-colors mt-4">Create Account</button>
</div>
{/*  Business Form (Hidden by default in logic but shown here for layout)  */}
<div className="space-y-5 hidden" id="business-form">
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Name</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">domain</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Grand Plaza Hotel" type="text" />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Owner Name</label>
<input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Jane Smith" type="text" />
</div>
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">License Number</label>
<input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="BUS-123456" type="text" />
</div>
</div>
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
<select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
<option>Hotel</option>
<option>Guesthouse</option>
<option>Resort</option>
<option>Apartment</option>
</select>
</div>
<div className="space-y-2">
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Email</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">business_center</span>
<input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="contact@grandplaza.com" type="email" />
</div>
</div>
<button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-colors mt-4">Register Business</button>
</div>
<div className="mt-8 text-center">
<p className="text-slate-500 dark:text-slate-400 text-sm">Already have an account? <a className="text-primary font-bold hover:underline" href="#">Log in</a></p>
</div>
</div>
<div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row gap-4 justify-center items-center">
<p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Or continue with</p>
<div className="flex gap-4">
<button className="p-2 px-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
<img alt="Google Logo" className="w-4 h-4" data-alt="Google colorful logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUB_wBExSjl5EQK6yv8zPJBvSeyMDqvjpuc61LzgNXPrvYSST8isgQZGryHXPaFJnD1GYC3yORwXVbEd6g18HRw-UmnLr6kq-RxMh3RmGKgxwtveqlNxZ6f6jwc6yQl1lMMK0GIeoeDO9P4tqHoTbmQetItdD2OgmSkastgSjEFbJ99LvSaoJhdJReHau7rMezPS9xCZQM58HCEJXmJbOqDxbT1jqyLYCKOHyQJ5KPtV77HeegL7TsJ3FLxEB9cqd2geikiFcfKQpS" />
<span className="text-sm font-semibold">Google</span>
</button>
<button className="p-2 px-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-xl">ios</span>
<span className="text-sm font-semibold">Apple</span>
</button>
</div>
</div>
</div>
</main>
<footer className="p-10 text-center space-y-4">
<div className="flex justify-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
<a className="hover:text-primary" href="#">Terms of Service</a>
<a className="hover:text-primary" href="#">Privacy Policy</a>
<a className="hover:text-primary" href="#">Cookies</a>
</div>
<p className="text-slate-400 dark:text-slate-500 text-xs">© 2024 StayMaster Inc. All rights reserved.</p>
</footer>
</div>
</div>
{/*  Toggle logic for the layout demo  */}


    </>
  );
}
