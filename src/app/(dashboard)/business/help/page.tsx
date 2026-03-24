
export default function BusinessHelpCenter() {
  return (
    <>
      <div className="layout-content-container flex flex-col max-w-[1024px] flex-1 px-4 md:px-10">
{/*  Hero Section  */}
<div className="@container">
<div className="@[480px]:py-3">
<div className="bg-cover bg-center flex flex-col justify-center items-center overflow-hidden bg-primary rounded-xl min-h-[260px] relative" data-alt="Modern bright office space interior background" style={{ backgroundImage: "linear-gradient(135deg, rgba(19, 91, 236, 0.95) 0%, rgba(10, 50, 130, 0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuByMOmh5wiCWzspRY9rDboX4W0ZUzB5tMgAPX2t5GbXWEmBxlzOL2kzADDRhMF1THuj9xS5ogou5_u1C54HbjF2BE5aLmHksUW6SeQBIpT-k7Y7W3GglWkNOEwqK7pf0EbfIplfhU0tXAoUhHqXeKGU8CYHLz_xD4YlFylwN7aTpr0OBZlH69OBIdHvyRXYVmYXkuIkjgDiwSHBra2BOW8J34vR6fYpHk9scH6ZJHDvJFwMymrPPFQ46vNFrQFUQrvzJ9X-bDDPKtbG')" }}>
<div className="flex flex-col items-center text-center p-8 space-y-4">
<h1 className="text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight">Host Success Center</h1>
<p className="text-primary-100 text-lg text-white/90 max-w-xl">Find the answers you need to manage your properties and grow your business with StayMaster.</p>
</div>
</div>
</div>
</div>
{/*  Search Bar Section  */}
<div className="py-6 -mt-10 px-4 md:px-20 relative z-10">
<label className="flex flex-col w-full shadow-xl rounded-xl overflow-hidden">
<div className="flex w-full items-stretch h-16">
<div className="text-slate-400 flex bg-white dark:bg-slate-800 items-center justify-center pl-6">
<span className="material-symbols-outlined">search</span>
</div>
<input className="form-input flex w-full flex-1 border-none bg-white dark:bg-slate-800 focus:ring-0 text-slate-900 dark:text-slate-100 h-full placeholder:text-slate-400 px-4 text-lg font-normal" placeholder="Search for help articles, FAQs, and more..." value="" />
<div className="bg-white dark:bg-slate-800 pr-3 flex items-center">
<button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold transition-all">Search</button>
</div>
</div>
</label>
</div>
{/*  Categories Section  */}
<div className="flex items-center justify-between px-4 pb-3 pt-8">
<h2 className="text-slate-900 dark:text-slate-100 text-[22px] font-bold leading-tight tracking-[-0.015em]">Browse by Category</h2>
<a className="text-primary text-sm font-bold hover:underline" href="#">View All Topics</a>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
{/*  Category Card 1  */}
<div className="group flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 cursor-pointer">
<div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative" data-alt="Person setting up a laptop on a wooden desk" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDift5UQMao2viWwHFhACUYv5FstgH5u1_c-UzehnxWfxG6M3MlWqBuK0zqMGwEgpG9oh8LY3I_4Do4BMIR18Atq6snplxTWRNXHcP1RHH1Oc3vyTYGS-ZENOwsXCoWKk_DB6BiYoY41xlMq9SAZNjFCCm7LVBlTFpek6udLc587sYICbWo5j-6W2t43U1LcubXxcGKhbHOWKdeg7myV1qLcfP8FAC_nJHI7cCRf6RWpXuCdbLzl5IKxchV2IbcHzA51nzBr-Id7_nD')` }}>
<div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-primary text-xl">rocket_launch</span>
<p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-normal">Getting Started</p>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Everything you need to know about setting up your host profile and first listing.</p>
</div>
</div>
{/*  Category Card 2  */}
<div className="group flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 cursor-pointer">
<div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative" data-alt="Calendar planner with marked booking dates" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHlA_9ZrJyzuo_a-fkDIjSH33lghyUF97hqEqeYsSkS6vbqiP5A5BnJT4s-Uer_H9SAGU3FKhaF6hdxy29ssY3MmYfA19dXQl7yYgpz_tgGNBwYuLfWBqpyRQLucOexUvAECUgM9VU5vLZ_xPv0k9P9bLGQz6GMxfkWWDymp7mGS-9e4YtLM2OdI3oxTnhp0CNkQB3ydDI0JYfrGeFj9ABBcv48d8g9rDbVU6iG7tazenh_xbDmb7kkF7U4F-DXS76iBE9L-sVlaOv')` }}>
<div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
<p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-normal">Managing Bookings</p>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Manage check-ins, guest communication, cancellations, and house rules.</p>
</div>
</div>
{/*  Category Card 3  */}
<div className="group flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 cursor-pointer">
<div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative" data-alt="Close up of a financial document and calculator" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFY7knTBKOEKnXAZXjSI_Y7mTjHt0K2zch78zAWTB5epbQL9ynxqLSd51Vz-5JPPmCSrAE4ZVobu-eSqd8rY4TUnSaWs4cLpA1wAB6oUN_kO88TD0cbYRoG009vmTcGnRQVaUcSHsQYXfTALvh1YmY0Xwx2TSZW7BsYOidVxP8TlLoIRXdRf6RBP23XSiCmEMaE2kfXvlWmS9PG8ObuWLgj8-22CbPyge2hfytPEUp95450VddhY-kLWxBfIgrJ-ITp_7Z6a9b1LkY')` }}>
<div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-primary text-xl">payments</span>
<p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-normal">Payment Issues</p>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Detailed info on payouts, taxes, security deposits, and payment disputes.</p>
</div>
</div>
</div>
{/*  Popular Articles Section  */}
<div className="px-4 py-8">
<h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4">Popular Help Articles</h2>
<div className="space-y-3">
<a className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors" href="#">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-slate-400">description</span>
<span className="text-slate-700 dark:text-slate-200 font-medium">How to optimize your listing for better ranking</span>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</a>
<a className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors" href="#">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-slate-400">description</span>
<span className="text-slate-700 dark:text-slate-200 font-medium">Understanding the host cancellation policy</span>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</a>
<a className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors" href="#">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-slate-400">description</span>
<span className="text-slate-700 dark:text-slate-200 font-medium">How to report a guest for rule violations</span>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</a>
</div>
</div>
{/*  Contact Support Section  */}
<div className="m-4 mt-8 p-8 bg-primary/10 dark:bg-primary/5 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
<div className="text-center md:text-left">
<h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-2">Still need help?</h3>
<p className="text-slate-600 dark:text-slate-400">Our support team is available 24/7 to assist you with any questions or technical issues.</p>
</div>
<button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">support_agent</span>
                            Contact Support
                        </button>
</div>
</div>
    </>
  );
}
