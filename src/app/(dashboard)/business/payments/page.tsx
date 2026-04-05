"use client";

import { useEffect, useState } from "react";
import { FinanceService } from "@/services/finance.service";
import { PartnerService } from "@/services/partner.service";
import { BusinessFinanceSummary } from "@/types/api";
import { format } from "date-fns";
import Link from 'next/link';

export default function BusinessPaymentsEarnings() {
  const [summary, setSummary] = useState<BusinessFinanceSummary | null>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [savedBanks, setSavedBanks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPayoutsLoading, setIsPayoutsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [payoutForm, setPayoutForm] = useState({
    amount: 0,
    bankName: "",
    accountNumber: "",
    accountHolder: ""
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const data = await FinanceService.getBusinessSummary();
        setSummary(data);
      } catch (err: any) {
        console.error("Finance fetch error:", err);
        setError("Could not load financial data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const fetchPayouts = async () => {
    try {
      setIsPayoutsLoading(true);
      const data = await FinanceService.getMyPayouts();
      setPayouts(data);
    } catch (err) {
      console.error("Payouts fetch error:", err);
    } finally {
      setIsPayoutsLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const data = await PartnerService.getBankAccounts();
      setSavedBanks(data as any[]);
      // Pre-select primary bank if available
      const primary = (data as any[]).find(b => b.isPrimary);
      if (primary) {
        setPayoutForm(prev => ({
          ...prev,
          bankName: primary.bankName,
          accountNumber: primary.accountNumber,
          accountHolder: primary.accountHolder
        }));
      }
    } catch (err) {
      console.error("Banks fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPayouts();
    fetchBanks();
  }, []);

  const handleSubmitPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutForm.amount <= 0 || payoutForm.amount > (summary?.availableBalance || 0)) {
      alert("Invalid amount. Must be greater than 0 and less than available balance.");
      return;
    }

    try {
      setIsSubmitting(true);
      await FinanceService.createPayoutRequest(payoutForm);
      setIsModalOpen(false);
      setPayoutForm({ amount: 0, bankName: "", accountNumber: "", accountHolder: "" });
      fetchPayouts(); // Refresh list
      // Optionally refresh summary if balance changes immediately (usually pending)
    } catch (err) {
      alert("Failed to submit payout request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <span className="size-1.5 rounded-full bg-green-500"></span>
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500"></span>
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500"></span>
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <span className="size-1.5 rounded-full bg-slate-400"></span>
            {status}
          </span>
        );
    }
  };

  const getPayoutStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <span className="size-1.5 rounded-full bg-green-500"></span>
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500"></span>
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500"></span>
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <span className="size-1.5 rounded-full bg-slate-400"></span>
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 animate-pulse">Loading financial data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/*  Header Section  */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Payments & Earnings</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track your income and manage your payout settings.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
              Payout Settings
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
          </div>
        )}

        {/*  Metrics Cards  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+0% this month</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earnings</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {(summary?.totalEarnings || 0).toLocaleString("vi-VN")}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">hourglass_empty</span>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">Real-time</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payouts</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {(summary?.pendingPayouts || 0).toLocaleString("vi-VN")}
            </p>
          </div>

          <div className="bg-primary p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/10 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80 text-white/80">Available Balance</p>
              <p className="text-3xl font-bold text-white mt-1 tracking-tight">
                {(summary?.availableBalance || 0).toLocaleString("vi-VN")}
              </p>
            </div>
            <button 
              onClick={() => {
                setPayoutForm({ ...payoutForm, amount: summary?.availableBalance || 0 });
                setIsModalOpen(true);
              }}
              className="mt-4 w-full py-2 bg-white text-primary rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-md"
            >
              Request Instant Payout
            </button>
          </div>
        </div>

        {/*  Transaction Table Section  */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Transaction History</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-primary focus:border-primary">
                  <option>Recent Transactions</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2 text-[18px] pointer-events-none text-slate-400">expand_more</span>
              </div>
              <button className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-all">
                <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-400">filter_list</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {summary?.recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  summary?.recentTransactions
                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                    .map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                        {format(new Date(tx.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">#BK-{tx.id.toString().padStart(5, '0')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{tx.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{tx.roomName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-right">
                        {tx.amount.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(tx.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
                        <button className="hover:text-primary"><span className="material-symbols-outlined">receipt_long</span></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, summary?.recentTransactions.length || 0)} to {Math.min(currentPage * ITEMS_PER_PAGE, summary?.recentTransactions.length || 0)} of {summary?.recentTransactions.length || 0} transactions
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil((summary?.recentTransactions.length || 0) / ITEMS_PER_PAGE)))}
                disabled={currentPage >= Math.ceil((summary?.recentTransactions.length || 0) / ITEMS_PER_PAGE)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Payout History Section */}
        <div className="mt-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payout History</h2>
            <p className="text-sm text-slate-500">Manage and track your payout requests and bank transfers.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Requested Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bank Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isPayoutsLoading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading payout records...</td></tr>
                ) : payouts.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No payout requests found.</td></tr>
                ) : (
                  payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                        {p.createdAt ? format(new Date(p.createdAt), "MMM dd, yyyy HH:mm") : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                        {p.amount.toLocaleString("vi-VN")} VND
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="font-semibold">{p.bankName}</div>
                        <div className="text-xs">{p.accountNumber} - {p.accountHolder}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getPayoutStatusBadge(p.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {p.proofImageUrl ? (
                          <button 
                            onClick={() => setPreviewImage(p.proofImageUrl || null)}
                            className="flex items-center gap-1 text-primary hover:underline font-bold"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                            View Proof
                          </button>
                        ) : p.status === 'pending' ? (
                          <span className="italic text-slate-400">Awaiting processing</span>
                        ) : (
                          <span className="italic text-slate-400">No proof provided</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Footer Summary info  */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Earnings Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Accommodation Fees</span>
                <span className="text-sm font-bold">{(summary?.totalEarnings || 0).toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Platform Commission (0%)</span>
                <span className="text-sm font-bold text-green-500">0 VND</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Need help with payouts?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-2">Our financial support team is available 24/7 to assist with reconciliation and tax documents.</p>
            <button className="mt-4 px-6 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/5 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Request Payout */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Request Payout</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmitPayout} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Amount to Withdrawal (VND)</label>
                <input 
                  type="number" 
                  required
                  value={payoutForm.amount}
                  onChange={(e) => setPayoutForm({ ...payoutForm, amount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Enter amount..."
                />
                <p className="mt-1.5 text-xs text-slate-400">Max available: <span className="font-bold text-primary">{(summary?.availableBalance || 0).toLocaleString("vi-VN")} VND</span></p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {savedBanks.length > 0 ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Select Saved Bank Account</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none mb-4"
                      onChange={(e) => {
                        const selected = savedBanks.find(b => b.id === Number(e.target.value));
                        if (selected) {
                          setPayoutForm({
                            ...payoutForm,
                            bankName: selected.bankName,
                            accountNumber: selected.accountNumber,
                            accountHolder: selected.accountHolder
                          });
                        }
                      }}
                    >
                      <option value="">-- Choose a saved account --</option>
                      {savedBanks.map(b => (
                        <option key={b.id} value={b.id}>{b.bankName} - {b.accountNumber} ({b.accountHolder})</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl mb-4">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      You have no saved bank accounts. 
                      <Link href="/business/settings" className="ml-1 font-bold underline">Go to Settings</Link> to save your bank details for faster payouts.
                    </p>
                  </div>
                )}

                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Bank Details Summary</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Bank Name</p>
                      <p className="text-sm font-bold">{payoutForm.bankName || '---'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Account Holder</p>
                      <p className="text-sm font-bold">{payoutForm.accountHolder || '---'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Account Number</p>
                    <p className="text-sm font-mono font-bold tracking-widest">{payoutForm.accountNumber || '---'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] px-4 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Evidence Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors flex items-center gap-2 font-bold"
              onClick={() => setPreviewImage(null)}
            >
              <span className="material-symbols-outlined">close</span>
              Close
            </button>
            <div className="bg-white p-1 rounded-2xl shadow-2xl">
              <img 
                src={previewImage} 
                alt="Payment Proof" 
                className="max-h-[88vh] w-auto rounded-xl object-contain shadow-lg"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
            <div className="mt-4 px-8 py-2.5 bg-primary text-white rounded-full border border-white/20 text-sm font-black shadow-xl shadow-primary/30 ring-2 ring-white/20 animate-bounce-subtle">
              Payment Evidence Preview
            </div>
          </div>
        </div>
      )}
    </>
  );
}
