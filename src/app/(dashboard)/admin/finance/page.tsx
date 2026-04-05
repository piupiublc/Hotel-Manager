"use client";

import { useEffect, useState } from "react";
import { FinanceService } from "@/services/finance.service";
import { UploadService } from "@/services/upload.service";
import { Payout, ProcessPayoutRequest } from "@/types/api";
import { format } from "date-fns";

export default function AdminFinanceOverview() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  
  // Payout Processing State
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processForm, setProcessForm] = useState<ProcessPayoutRequest>({
    status: 'paid',
    transactionId: '',
    proofImageUrl: '',
    adminNote: ''
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchAllPayouts = async () => {
    try {
      setIsLoading(true);
      const data = await FinanceService.getAllPayouts();
      setPayouts(data);
    } catch (err) {
      console.error("Failed to fetch payouts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await FinanceService.getAdminSummary();
      setSummary(data);
    } catch (err) {
      console.error("Failed to fetch admin summary:", err);
    }
  };

  useEffect(() => {
    fetchAllPayouts();
    fetchSummary();
  }, []);

  const handleUploadProof = async () => {
    if (!uploadFile) return;
    try {
      setIsUploading(true);
      const { url } = await UploadService.uploadImage(uploadFile);
      setProcessForm(prev => ({ ...prev, proofImageUrl: url }));
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProcessPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayout) return;

    try {
      setIsProcessing(true);
      await FinanceService.processPayout(selectedPayout.id, processForm);
      setIsProcessModalOpen(false);
      setSelectedPayout(null);
      setProcessForm({ status: 'paid', transactionId: '', proofImageUrl: '', adminNote: '' });
      setUploadFile(null);
      fetchAllPayouts();
      fetchSummary();
    } catch (err) {
      alert("Failed to process payout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getPayoutStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase">Pending</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-[10px] font-bold uppercase">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+0%
            </span>
          </div>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Payouts (Paid)</p>
          <p className="text-2xl font-extrabold text-on-surface">{(summary?.totalPayouts || 0).toLocaleString("vi-VN")} VND</p>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">monetization_on</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+0%
            </span>
          </div>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Net Revenue (Gross)</p>
          <p className="text-2xl font-extrabold text-on-surface">{(summary?.totalRevenue || 0).toLocaleString("vi-VN")} VND</p>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <span className="text-amber-600 text-xs font-bold flex items-center bg-amber-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs mr-1">trending_flat</span>0%
            </span>
          </div>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Bookings</p>
          <p className="text-2xl font-extrabold text-on-surface">{summary?.totalBookings || 0}</p>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <span className="text-blue-600 text-xs font-bold flex items-center bg-blue-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+0%
            </span>
          </div>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
          <p className="text-2xl font-extrabold text-on-surface">{summary?.totalUsers || 0}</p>
        </div>
      </div>

      {/* Payout Requests Section */}
      <section className="bg-surface rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-on-surface tracking-tight">Partner Payout Requests</h3>
            <p className="text-xs text-on-surface-variant">Review and process withdrawal requests from hotel partners.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
              {payouts.filter(p => p.status === 'pending').length} Action Required
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold">
                <th className="px-6 py-4">Request Info</th>
                <th className="px-6 py-4">Partner / Property</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-medium">Loading payout requests...</td></tr>
              ) : payouts.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">No payout requests found.</td></tr>
              ) : (
                payouts.sort((a, b) => a.status === 'pending' ? -1 : 1).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-on-surface">#{p.id.toString().padStart(6, '0')}</div>
                      <div className="text-[10px] text-on-surface-variant">{format(new Date(p.createdAt), "MMM dd, yyyy HH:mm")}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-surface">{p.businessName}</div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-on-surface">
                      {p.amount.toLocaleString("vi-VN")} VND
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold">{p.bankName}</div>
                      <div className="text-[10px] text-on-surface-variant">{p.accountNumber} - {p.accountHolder}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getPayoutStatusBadge(p.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {p.status === 'pending' ? (
                        <button 
                          onClick={() => {
                            setSelectedPayout(p);
                            setIsProcessModalOpen(true);
                          }}
                          className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
                        >
                          Process Payment
                        </button>
                      ) : p.proofImageUrl ? (
                        <button 
                          onClick={() => setPreviewImage(p.proofImageUrl || null)}
                          className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-bold"
                        >
                          View Proof
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Transaction Ledger Section (Existing) */}
      <section className="bg-surface rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-on-surface tracking-tight">Transaction Ledger</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined text-sm">download</span> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Business / Host</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Platform Fee (3%)</th>
                <th className="px-6 py-4">Commission (12%)</th>
                <th className="px-6 py-4">Net Payout</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
               <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-92834-BR</td>
                <td className="px-6 py-4 text-slate-600">Oct 24, 2023</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">RH</div>
                    <span className="font-bold text-on-surface">Riverfront Heights</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold">4,200.00 VND</td>
                <td className="px-6 py-4 text-slate-500">126.00 VND</td>
                <td className="px-6 py-4 text-slate-500">504.00 VND</td>
                <td className="px-6 py-4 font-extrabold text-primary">3,570.00 VND</td>
                <td className="px-6 py-4 text-xs">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Process Payout Modal */}
      {isProcessModalOpen && selectedPayout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Process Payout Request</h3>
                <p className="text-xs text-slate-500">Processing payment for {selectedPayout.businessName}</p>
              </div>
              <button onClick={() => setIsProcessModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleProcessPayout} className="p-6 space-y-5">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Partner</p>
                    <p className="text-sm font-bold text-on-surface">{selectedPayout.businessName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Amount</p>
                    <p className="text-sm font-bold text-primary">{selectedPayout.amount.toLocaleString("vi-VN")} VND</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Bank Information</p>
                    <p className="text-xs font-medium text-on-surface">
                      {selectedPayout.bankName} - {selectedPayout.accountNumber}<br/>
                      <span className="font-bold">{selectedPayout.accountHolder}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Action</label>
                  <select 
                    value={processForm.status}
                    onChange={(e) => setProcessForm({...processForm, status: e.target.value as any})}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="paid">Approve & Mark as Paid</option>
                    <option value="rejected">Reject Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Transaction ID</label>
                  <input 
                    type="text"
                    value={processForm.transactionId}
                    onChange={(e) => setProcessForm({...processForm, transactionId: e.target.value})}
                    placeholder="e.g. EBK10293848"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    required={processForm.status === 'paid'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Payment Proof (Screenshot)</label>
                <div className="flex gap-3">
                  <input 
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {uploadFile && !processForm.proofImageUrl && (
                    <button 
                      type="button"
                      onClick={handleUploadProof}
                      disabled={isUploading}
                      className="px-4 py-1 bg-slate-900 text-white rounded-full text-[10px] font-bold disabled:opacity-50"
                    >
                      {isUploading ? "Uploading..." : "Upload Now"}
                    </button>
                  )}
                </div>
                {processForm.proofImageUrl && (
                  <div className="mt-2 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    File uploaded successfully
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Internal Notes</label>
                <textarea 
                  rows={2}
                  value={processForm.adminNote}
                  onChange={(e) => setProcessForm({...processForm, adminNote: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional notes for partner or admin..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsProcessModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing || (processForm.status === 'paid' && !processForm.proofImageUrl)}
                  className="flex-[2] px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-black transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  )}
                  {processForm.status === 'paid' ? 'Confirm Payout' : 'Reject Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Evidence Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors flex items-center gap-2 font-bold"
              onClick={() => setPreviewImage(null)}
            >
              <span className="material-symbols-outlined">close</span>
              Close Preview
            </button>
            <div className="bg-white p-1 rounded-2xl shadow-2xl">
              <img 
                src={previewImage} 
                alt="Payment Proof" 
                className="max-h-[88vh] w-auto rounded-xl object-contain shadow-lg"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
            <div className="mt-4 px-8 py-2.5 bg-slate-900 text-white rounded-full border border-white/20 text-sm font-black shadow-2xl ring-2 ring-white/20">
              Admin Verification Mode
            </div>
          </div>
        </div>
      )}
    </>
  );
}
