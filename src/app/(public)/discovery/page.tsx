import Link from "next/link";

export default function CustomerDiscovery() {
  return (
    <>
      
<header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-12 py-4">
<div className="max-w-7xl mx-auto flex items-center justify-between">
<Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined text-3xl font-bold">bedroom_parent</span>
<h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">StayMaster</h1>
</Link>
<nav className="hidden md:flex items-center gap-8">
<a className="text-sm font-semibold text-primary" href="#">Discover</a>
<a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Bookings</a>
<a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Saved</a>
</nav>
<div className="flex items-center gap-3">
<button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="User profile avatar photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQQsVBZ3DA-5F2aaMHhfr4_z5KxUUegBYmKU75o1reAs4IfS4V3w3G_4NLNRbetFpvICuIQ4IUb2WEu4mBEJvETJOu-RYrJJCvzcnweKYixwN7Jfl-HLZY-DmmTztbVnZaVM4qKErJcTU1WwlxotZrm8nEYeiUczqcyra_GbfDJ6q6e5AxnJq7hzcHA8G3dxLeV9mF9pF4_Tm27IiCfqnq1jot3VPGeRe7-UVi5yBhfzWnp6FkW_E5xC--rGO4_Y3UTIO8wDUlQNSv" />
</div>
</div>
</div>
</header>
<main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
<section className="mb-10">
<div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
<div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
<span className="material-symbols-outlined text-slate-400">location_on</span>
<div className="flex flex-col">
<span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Location</span>
<input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Where are you going?" type="text" />
</div>
</div>
<div className="h-auto w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
<div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
<span className="material-symbols-outlined text-slate-400">calendar_month</span>
<div className="flex flex-col">
<span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Check-in - Check-out</span>
<input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Add dates" type="text" />
</div>
</div>
<div className="h-auto w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
<div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary transition-all">
<span className="material-symbols-outlined text-slate-400">group</span>
<div className="flex flex-col">
<span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Guests</span>
<input className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full placeholder:text-slate-400" placeholder="Add guests" type="text" />
</div>
</div>
<button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-3 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">search</span>
                        Search
                    </button>
</div>
</section>
<section className="mb-8">
<div className="flex flex-wrap items-center justify-between gap-4">
<div className="flex flex-wrap items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
<span className="material-symbols-outlined text-lg">attach_money</span>
                            Price Range
                            <span className="material-symbols-outlined text-lg">expand_more</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
<span className="material-symbols-outlined text-lg">star</span>
                            Guest Rating
                            <span className="material-symbols-outlined text-lg">expand_more</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
<span className="material-symbols-outlined text-lg">home_work</span>
                            Property Type
                            <span className="material-symbols-outlined text-lg">expand_more</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold hover:border-primary transition-colors">
<span className="material-symbols-outlined text-lg">wifi</span>
                            Amenities
                            <span className="material-symbols-outlined text-lg">expand_more</span>
</button>
</div>
<p className="text-sm font-medium text-slate-500">Showing 142 results</p>
</div>
</section>
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxury coastal guesthouse with infinity pool" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzK_vfTS1ZlV2yOLOt6PMTPEzqIbQRAhJF5xCJMGhfkYM3Vd5pJWBkgTl4DHnctUwPVor8udytc_0u_3O4Au7kQth9aoJ-1fEJJOft46_YKUVdG26meVSOwQlJwL9zICS5ZP6yEurMiXfFCgO216Xyo_GVV9IwgLQ4EastFusDRkJFg7rjySoCW2V6lXekutwzIqxwcTOWxi8FueuQZRgFt3F5iHoX6ogkBfrmweIOyZYErdA7__GCHy5VXYZKBr9G99JbWdzopfmd" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
<div className="absolute bottom-4 left-4">
<span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white backdrop-blur-sm">Rare Find</span>
</div>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Ocean View Villa</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.92</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Malibu, California</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">wifi</span>
<span className="material-symbols-outlined text-sm">pool</span>
<span className="material-symbols-outlined text-sm">local_parking</span>
<span className="material-symbols-outlined text-sm">ac_unit</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$245</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Cozy mountain cabin in snowy woods" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA615fFRdP8UIJNjFrWUFEIinfd1S-FAU1diM6ldxx3B3bnrWtNzMpc7Jy7yVe9N2n-pH2xIAGyGWyvSTtJvIobo0IitUPx3KZSOPQOsRTKwb3T9U0OzdlRcfTEJAwXtNiXGfyLT1xkeP2j0fIcM8dkTT7GpC_EVKuCzVo2V0wlVo96BZw7_Cf9zXpG69s2gpOyR8icXQtJBD-Dhd6kJMPFg_cIeTEO_O4EeSPbkUkp_axSkhrPc1mxd7jm28xTB3wCMQr2tm3Q1v_g" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Alpine Retreat</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.88</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Aspen, Colorado</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">fireplace</span>
<span className="material-symbols-outlined text-sm">hot_tub</span>
<span className="material-symbols-outlined text-sm">kitchen</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$189</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern loft apartment with high ceilings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRlZc-7VE2hKUZnb2oSm877hllvGpyFp1Gm6co4kVJnZxGbqaPWncLXV8mrL3cI-fgkfVkN-4_5m05bZbyeM_Dd6oKThWhiKeTxX4P9vFZFFlFNukDKh7t-sogmJIvizGZwZ24P8Ljmkd3EaWZNYLuOw_q89Aai_Xsfvujetoq9cOARx_U6c7dngNLs0h5wpAw2J7mNMejgfHp0WPyq1ODKQiO1wLef53H2fR3o4Px4LV0dewol0JbC596qdKLUH3XDf3hjkJyF_IC" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Urban Edge Loft</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.75</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">New York City, NY</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">work</span>
<span className="material-symbols-outlined text-sm">tv</span>
<span className="material-symbols-outlined text-sm">elevator</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$320</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Serene beach house on white sands" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVBkAlwUS1tbqDeaMNYgxWklJS9zRS0WtDbFIbC8j48LnKwjGCYfOhOOkP5OMHu3-ndncmhZt3nTX-Tryy3ImoK6t8je1U39fz581-zvUsHHVTGkP78tLV-CsNZf8xhCuVlVlTXeu1f9vAu8-ixpgDylf0B6Fd8KDnInbjK8-M7KbZhE64Ko9Fxqoy4TLsw_MHd8yNFLF6Dl3i5UbKgPhng2ACFwEqsv3g8CSzCRHwtmI7kpv7NIn7016t7g4Ep1MlpKczVTIUNGQ1" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Sand & Sun Cabin</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.96</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Destin, Florida</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">beach_access</span>
<span className="material-symbols-outlined text-sm">outdoor_grill</span>
<span className="material-symbols-outlined text-sm">waves</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$155</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional Japanese style guesthouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDamErfh1biv_wX1NBTPCvsdX_C_bFR_Lh-qvO5MajGXg7xoz_fa5sBUcRp0RIjSBzuudEjKysLqc2DXjbnp9Br4BfxWGWcr4u1I8nV87eNRbRJsder3WVgM-SMrjUcwWfs1YLs_f97vNzcR4yNwtji0mdlyUj25zaSG9z9dPnmpJKK5qXwIteuvG0Kc7BwT-nFki6vsHQF9fpqmKJiSFuGPEt2b12G8tb-2M-IowYg91uhsyrUNRhNKVIBG7TMr5O9GcbUwqyi6X3D" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Zen Garden Stay</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.91</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Kyoto, Japan</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">spa</span>
<span className="material-symbols-outlined text-sm">park</span>
<span className="material-symbols-outlined text-sm">pets</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$210</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern interior of a boutique guesthouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQuE0FGQfPg06Q5CJwbuEmcqbo51wXuy_JHyNSe2-yOTKNSnNJyPITShkwqFGQoEoLyuILZrtKL-mAwamygIIvrrplKm9Fr9CAgttVFC3bHPUSr1gotqxBzDzakGlY8wh-NWl3_p7HjbOZ8zcEOwS4oNgvIf-mtsvssDvoXpiev6YzpqR43mwaEJqg_t2j6aFsIpfyXjrrgUZ8gtS2SEWsdD0n4U71xE5a1fUnTn7TTLdUMCrNHHIkPBAlJNJTyPF29Nd3g0sRrQxU" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
<div className="absolute bottom-4 left-4">
<span className="px-3 py-1 bg-primary rounded-full text-[10px] font-bold uppercase tracking-wider text-white">Guest Choice</span>
</div>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">The Designer House</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.98</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Paris, France</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">local_cafe</span>
<span className="material-symbols-outlined text-sm">apartment</span>
<span className="material-symbols-outlined text-sm">wine_bar</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$275</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Large suburban house with manicured lawn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfz3leRRCLmXar8cqHM2os_eW6d9hTlnSAgIvpSfH7g6H7qN1jLKigpdxAuDv-_yO5k5zqUg3pK9J9hQu-8fkMn4Vz-ztM5l41KEcZU_aDvsbEJ-ufd74N3Kadv078G2rmOqv5pMs7V6VtEYaMDsDwRG9bU98H-oZimO_0IsnjP4jC9j8JF90AUhb_my6lvPbbQcLTfnQ_FEEhJA7PpNn2DXtKib5J4jY5hKWMdjdXMO47t698vOCubW4RB4qKasotUWZnLfDxoqzJ" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Family Haven</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.65</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Austin, Texas</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">family_restroom</span>
<span className="material-symbols-outlined text-sm">deck</span>
<span className="material-symbols-outlined text-sm">sports_esports</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$140</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
<div className="group cursor-pointer">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Eco-friendly modern home in the desert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgLnLGYXddemY0Zmaguxb6bmZfXxRkcDZfZI_-u5bVbGRAaQnCzaL_HOSSKs0LRJ6mUx3V3YKRao0pGMsash28JP_BDg2MTJzGefJz92lIv17A1PJG2Act1KRLYBIaknmNTBPLvTQt4wB3NU1x_zoUB0Ih-yOOo1vb7pg22aBz0FRSSPIhk8qg2tEXFqCwBvmaLyUi0-QgQLgWSnp2aYFQgUqjm9g1lgMScKnXnQJoZS6sDuZFMoCFXoxs9r72JPA8waJK8J16zAss" />
<button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
<span className="material-symbols-outlined">favorite</span>
</button>
</div>
<div className="flex justify-between items-start mb-1">
<h3 className="font-bold text-lg">Desert Eco-Lodge</h3>
<div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm fill-icon">star</span>
<span className="text-sm font-bold">4.82</span>
</div>
</div>
<p className="text-slate-500 text-sm mb-2">Joshua Tree, CA</p>
<div className="flex items-center gap-3 mb-4 text-slate-400">
<span className="material-symbols-outlined text-sm">solar_power</span>
<span className="material-symbols-outlined text-sm">visibility</span>
<span className="material-symbols-outlined text-sm">mountain_flag</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-lg font-extrabold">$195</span>
<span className="text-slate-500 text-sm">/ night</span>
</div>
</div>
</section>
<div className="mt-16 flex justify-center">
<button className="px-8 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Load more stays
                </button>
</div>
</main>
<footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-12 py-12">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
<div className="max-w-xs">
<Link href="/" className="flex items-center gap-2 text-primary mb-4 hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined text-2xl font-bold">bedroom_parent</span>
<h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">StayMaster</h2>
</Link>
<p className="text-slate-500 text-sm leading-relaxed">Helping travelers find unique and comfortable guesthouses around the world with ease and trust.</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
<div className="flex flex-col gap-4">
<h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Support</h4>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Help Center</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Safety Information</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Cancellation Options</a>
</div>
<div className="flex flex-col gap-4">
<h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Hosting</h4>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Master your hosting</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Community Forum</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Hosting Responsibly</a>
</div>
<div className="flex flex-col gap-4">
<h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">StayMaster</h4>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Our Story</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Careers</a>
<a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Investors</a>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
<p className="text-sm text-slate-400">© 2024 StayMaster Inc. All rights reserved.</p>
<div className="flex items-center gap-6">
<a className="text-sm text-slate-400 hover:text-slate-600" href="#">Privacy</a>
<a className="text-sm text-slate-400 hover:text-slate-600" href="#">Terms</a>
<a className="text-sm text-slate-400 hover:text-slate-600" href="#">Sitemap</a>
</div>
</div>
</footer>

    </>
  );
}
