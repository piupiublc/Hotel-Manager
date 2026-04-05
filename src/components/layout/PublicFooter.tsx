import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 md:px-12 py-12 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6 max-w-xs">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-xl">night_shelter</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StayMaster</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tối ưu hóa quản lý nhà nghỉ và khách sạn với nền tảng công nghệ hiện đại, minh bạch và hiệu quả.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">f</div>
               <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">t</div>
               <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">i</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-6">Sản phẩm</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="/discovery">Khám phá</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="/#features">Tính năng</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="/#pricing">Bảng giá</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="/#solutions">Giải pháp</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-6">Hố trợ</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="#">Trung tâm trợ giúp</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="#">An toàn & Bảo mật</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="#">Chính sách hủy</Link></li>
              <li><Link className="text-slate-500 hover:text-primary transition-colors" href="#">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-6">Bản tin</h4>
            <p className="text-sm text-slate-500 mb-4">Nhận thông tin mới nhất về xu hướng lưu trú.</p>
            <div className="flex gap-2">
              <input 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2 focus:ring-1 focus:ring-primary focus:outline-none" 
                placeholder="Email của bạn" 
                type="email" 
              />
              <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400">© 2024 StayMaster Inc. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-8">
            <Link className="text-slate-400 hover:text-slate-600 transition-colors" href="#">Quyền riêng tư</Link>
            <Link className="text-slate-400 hover:text-slate-600 transition-colors" href="#">Điều khoản</Link>
            <Link className="text-slate-400 hover:text-slate-600 transition-colors" href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
