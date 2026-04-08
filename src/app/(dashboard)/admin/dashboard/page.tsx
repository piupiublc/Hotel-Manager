"use client";

import { useEffect, useState } from "react";
import { FinanceService } from "@/services/finance.service";
import { AdminFinanceSummary } from "@/types/api";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [summary, setSummary] = useState<AdminFinanceSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const data = await FinanceService.getAdminSummary();
        setSummary(data);
      } catch (err: any) {
        console.error("Admin dashboard fetch error:", err);
        setError("Could not load executive overview. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 animate-pulse">Loading platform statistics...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 space-y-8">
        {/*  Page Title  */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Executive Overview</h2>
            <p className="text-slate-500 ">Real-time performance metrics for StayMaster platform.</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="p-2 bg-white  border border-slate-200  rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600 ">refresh</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
          </div>
        )}

        {/*  KPI Cards  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl">payments</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                Live
              </span>
            </div>
            <p className="text-slate-500  text-sm font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-1">{(summary?.totalRevenue || 0).toLocaleString("vi-VN")} VND</h3>
          </div>

          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl">groups</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100  rounded-lg text-blue-600">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
            <p className="text-slate-500  text-sm font-medium">Total Users</p>
            <h3 className="text-2xl font-bold mt-1">{(summary?.totalUsers || 0).toLocaleString("vi-VN")}</h3>
          </div>

          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl">event</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-100  rounded-lg text-indigo-600">
                <span className="material-symbols-outlined">book_online</span>
              </div>
            </div>
            <p className="text-slate-500  text-sm font-medium">Total Bookings</p>
            <h3 className="text-2xl font-bold mt-1">{(summary?.totalBookings || 0).toLocaleString("vi-VN")}</h3>
          </div>

          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl">home</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-100  rounded-lg text-amber-600">
                <span className="material-symbols-outlined">apartment</span>
              </div>
            </div>
            <p className="text-slate-500  text-sm font-medium">Properties</p>
            <h3 className="text-2xl font-bold mt-1">{(summary?.totalProperties || 0).toLocaleString("vi-VN")}</h3>
          </div>
        </div>

        {/*  Charts Section  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold">Recent System Activity</h4>
              <span className="text-xs font-bold text-primary">Live Transactions</span>
            </div>
            <div className="space-y-4">
              {summary?.systemTransactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50  hover:bg-slate-100  transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {tx.status === 'confirmed' ? 'check_circle' : 'pending'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">{tx.customerName}</p>
                      <p className="text-[10px] text-slate-500">{tx.roomName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{tx.amount.toLocaleString("vi-VN")} VND</p>
                    <p className="text-[10px] text-slate-500">{format(new Date(tx.date), "MMM dd, HH:mm")}</p>
                  </div>
                </div>
              ))}
              {summary?.systemTransactions.length === 0 && (
                <div className="py-12 text-center text-slate-500">No recent activity detected.</div>
              )}
            </div>
          </div>

          <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold">Platform Overview</h4>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_horiz</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="text-center p-6 bg-slate-50  rounded-2xl">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Capacity</p>
                  <p className="text-4xl font-black text-primary">{(summary?.totalProperties || 0) * 8}+</p>
                  <p className="text-[10px] text-slate-400 mt-1">Est. rooms across platform</p>
                </div>
                <div className="text-center p-6 bg-slate-50  rounded-2xl">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Success Rate</p>
                  <p className="text-4xl font-black text-emerald-500">
                    {summary?.totalBookings ? Math.round((summary.systemTransactions.filter(t => t.status === 'confirmed').length / Math.max(summary.systemTransactions.length, 1)) * 100) : 0}%
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Confirmed vs Total Recent</p>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Platform Utilization</span>
                <span className="text-sm font-bold">High</span>
              </div>
              <div className="w-full bg-slate-100  h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

