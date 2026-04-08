import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="features" className="container mx-auto px-6 py-16 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                New: Smart Automated Check-ins
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-6xl">
                Effortless Guesthouse Management with <span className="text-primary">StayMaster</span>
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                The all-in-one platform to manage bookings, guests, and operations for hospitality businesses of all sizes. Streamline your workflow and focus on what matters: your guests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 h-14 px-8 bg-primary text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25">
                  Get Started Free
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-14 px-8 border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              <div className="relative aspect-video w-full rounded-2xl bg-slate-200 overflow-hidden shadow-2xl border border-slate-200">
                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq3Lc0OVLyBQ9xpdN0QpwLXqS2LIpSXvmF8EPsbqW065oNPGBfu3UdBW-AY9GjsN6v0wI8_ogzmHbcLmzsjW6QYVcEwp3AIDMkw49FEazvBKCJACVIoaBgdjx40adKek-ARQi75of_gGwuA2EzsnPBRIX4pdkPn2QvrFHFvDub_kP1WSgyRnYou2Ko7Ax1GKPflXxSwOdrdkkak4OzKGTLQl_kWcb9djgHUg7JkOarvvkSLq0hCB2TEkXq9emLJDMBrS14oxeSMGLl" alt="Hotel preview" />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section id="solutions" className="bg-white py-20 border-y border-slate-200">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Tailored Solutions for Everyone
              </h2>
              <p className="text-lg text-slate-600">
                StayMaster provides specialized tools to ensure a seamless experience for every stakeholder in the hospitality ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* For Admins */}
              <div className="flex flex-col p-8 rounded-2xl bg-background-light border border-slate-200 hover:border-primary/50 transition-colors group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">For Admins</h3>
                <p className="text-slate-600 leading-relaxed">
                  Complete oversight with powerful analytics and system-wide controls. Manage multiple properties from a single dashboard.
                </p>
              </div>

              {/* For Businesses */}
              <div className="flex flex-col p-8 rounded-2xl bg-background-light border border-slate-200 hover:border-primary/50 transition-colors group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">analytics</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">For Businesses</h3>
                <p className="text-slate-600 leading-relaxed">
                  Automate bookings, manage staff tasks, and grow your revenue with integrated marketing tools and payment processing.
                </p>
              </div>

              {/* For Customers */}
              <div className="flex flex-col p-8 rounded-2xl bg-background-light border border-slate-200 hover:border-primary/50 transition-colors group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">person_celebrate</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">For Customers</h3>
                <p className="text-slate-600 leading-relaxed">
                  Seamless booking experience with real-time updates, mobile keys, and personalized loyalty rewards for every stay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-20 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 rounded-2xl">
              <div className="text-4xl font-extrabold text-primary mb-2">2,500+</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Active Guesthouses</div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 rounded-2xl">
              <div className="text-4xl font-extrabold text-primary mb-2">150k+</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Monthly Bookings</div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 rounded-2xl">
              <div className="text-4xl font-extrabold text-primary mb-2">4.9/5</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Customer Rating</div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 rounded-2xl">
              <div className="text-4xl font-extrabold text-primary mb-2">99.9%</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Uptime Reliability</div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-6 py-20 lg:px-12 bg-white rounded-3xl mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose the plan that fits your business size. No hidden fees, cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="flex flex-col p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-shadow bg-background-light">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight text-slate-900">29 VND</span>
                  <span className="ml-1 text-slate-500">/month</span>
                </div>
              </div>
              <button className="w-full py-3 px-6 rounded-xl font-bold bg-slate-200 text-slate-900 hover:bg-slate-300 transition-colors mb-8">
                Start Free Trial
              </button>
              <ul className="flex-1 space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Up to 5 rooms
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Basic analytics
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400 line-through">
                  <span className="material-symbols-outlined text-slate-400 text-sm">cancel</span>
                  Marketing tools
                </li>
              </ul>
            </div>

            {/* Professional */}
            <div className="flex flex-col p-8 rounded-3xl border-2 border-primary ring-4 ring-primary/10 shadow-2xl bg-background-light relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Popular</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">Professional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight text-primary">79 VND</span>
                  <span className="ml-1 text-slate-500">/month</span>
                </div>
              </div>
              <button className="w-full py-3 px-6 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 mb-8">
                Get Started
              </button>
              <ul className="flex-1 space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Unlimited rooms
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Advanced reporting
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Marketing tools
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-shadow bg-background-light">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight text-slate-900">199 VND</span>
                  <span className="ml-1 text-slate-500">/month</span>
                </div>
              </div>
              <button className="w-full py-3 px-6 rounded-xl font-bold bg-slate-200 text-slate-900 hover:bg-slate-300 transition-colors mb-8">
                Contact Sales
              </button>
              <ul className="flex-1 space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Multiple locations
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Dedicated manager
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Custom integrations
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
