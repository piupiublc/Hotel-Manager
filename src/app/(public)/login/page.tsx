"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";

export default function LoginRegistration() {
  const [viewMode, setViewMode] = useState<'login' | 'register_c' | 'register_b'>('login');
  
  // Shared Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Customer State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Business State
  const [businessName, setBusinessName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (viewMode === 'login') {
        const res = await AuthService.login({ email, password });
        const userRole = res?.user?.role?.toLowerCase();
        
        if (userRole === 'customer') {
          window.location.href = '/discovery';
        } else if (userRole === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/business/dashboard';
        }
      } else if (viewMode === 'register_c') {
        await AuthService.registerCustomer({ email, password, fullName, phone });
        setViewMode('login'); // Redirect to login forms
        alert("Registration successful! Please login.");
      } else if (viewMode === 'register_b') {
        await AuthService.registerPartner({ email, password, fullName: businessName, phone });
        setViewMode('login');
        alert("Business Registration successful! Please login.");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-[520px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            {viewMode === 'login' ? 'Chào mừng quay lại' : 'Tham gia StayMaster'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {viewMode === 'login' ? 'Đăng nhập để quản lý công việc của bạn.' : 'Trải nghiệm quản lý lưu trú liền mạch ngay hôm nay.'}
          </p>
        </div>

        <div className="p-8">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          {viewMode !== 'login' && (
            <div className="mb-8">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Loại tài khoản</p>
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <label className="flex-1 cursor-pointer">
                  <input 
                    checked={viewMode === 'register_c'} 
                    onChange={() => setViewMode('register_c')}
                    className="hidden peer" 
                    name="account_type" 
                    type="radio" 
                  />
                  <div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-500 dark:text-slate-400">
                    Khách hàng
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input 
                    checked={viewMode === 'register_b'}
                    onChange={() => setViewMode('register_b')}
                    className="hidden peer" 
                    name="account_type" 
                    type="radio" 
                  />
                  <div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-500 dark:text-slate-400">
                    Doanh nghiệp
                  </div>
                </label>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {(viewMode === 'register_c') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Họ và tên</label>
                <input 
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  placeholder="Nguyễn Văn A" 
                  type="text" 
                />
              </div>
            )}

            {(viewMode === 'register_b') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tên doanh nghiệp</label>
                <input 
                  required
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  placeholder="Khách sạn Hòa Bình" 
                  type="text" 
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Địa chỉ Email</label>
              <input 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="name@example.com" 
                type="email" 
              />
            </div>

            {viewMode !== 'login' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Số điện thoại</label>
                <input 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  placeholder="0912 345 678" 
                  type="tel" 
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mật khẩu</label>
              <input 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-colors mt-4 disabled:opacity-50"
              type="submit"
            >
              {loading ? 'Đang xử lý...' : (viewMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản')}
            </button>
          </form>

          <div className="mt-8 text-center">
            {viewMode === 'login' ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Bạn chưa có tài khoản? <span onClick={() => setViewMode('register_c')} className="text-primary font-bold hover:underline cursor-pointer">Đăng ký</span>
              </p>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Bạn đã có tài khoản? <span onClick={() => setViewMode('login')} className="text-primary font-bold hover:underline cursor-pointer">Đăng nhập</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
