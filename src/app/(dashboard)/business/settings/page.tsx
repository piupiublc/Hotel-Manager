"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";
import { PartnerService } from "@/services/partner.service";
import { useAuth } from "@/hooks/useAuth";
import { UpdateProfileRequest } from "@/types/api";

type TabType = 'personal' | 'business' | 'bank';

export default function BusinessSettings() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Personal Info State
  const [personalForm, setPersonalForm] = useState<UpdateProfileRequest>({
    fullName: "",
    phone: "",
    cccd: "",
    address: "",
    avatar: ""
  });

  // Business Info State
  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    businessType: "",
    address: "",
    description: ""
  });

  // Bank Info State
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [showBankForm, setShowBankForm] = useState(false);
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    isPrimary: false
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch User Profile
      const userData = await UserService.getProfile() as any;
      if (userData) {
        setPersonalForm({
          fullName: userData.fullName || "",
          phone: userData.phone || "",
          cccd: userData.cccd || "",
          address: userData.address || "",
          avatar: userData.avatar || ""
        });
      }

      // Fetch Partner Profile
      const partnerData = await PartnerService.getPartnerProfile() as any;
      if (partnerData) {
        setBusinessForm({
          businessName: partnerData.businessName || "",
          businessType: partnerData.businessType || "",
          address: partnerData.address || "",
          description: partnerData.description || ""
        });
      }

      // Fetch Bank Accounts
      const banks = await PartnerService.getBankAccounts() as any;
      setBankAccounts(banks || []);

    } catch (error) {
      console.error("Failed to load settings data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UserService.updateProfile(personalForm);
      alert("Personal profile updated!");
      updateProfile({ fullName: personalForm.fullName, avatar: personalForm.avatar });
    } catch (error: any) {
      alert(error.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await PartnerService.updatePartnerProfile(businessForm);
      alert("Business profile updated!");
    } catch (error: any) {
      alert(error.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleBankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await PartnerService.saveBankAccount(bankForm);
      alert("Bank account saved!");
      setShowBankForm(false);
      setBankForm({ bankName: "", accountNumber: "", accountHolder: "", isPrimary: false });
      const banks = await PartnerService.getBankAccounts() as any;
      setBankAccounts(banks || []);
    } catch (error: any) {
      alert(error.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBank = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await PartnerService.deleteBankAccount(id);
      setBankAccounts(bankAccounts.filter(p => p.id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
        <p className="text-slate-500  text-lg">Manage your account, business profile, and payout methods.</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-slate-200 ">
        <button 
          onClick={() => setActiveTab('personal')}
          className={`pb-4 px-2 font-bold text-sm transition-all relative ${activeTab === 'personal' ? 'text-primary' : 'text-slate-400'}`}
        >
          Personal Profile
          {activeTab === 'personal' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('business')}
          className={`pb-4 px-2 font-bold text-sm transition-all relative ${activeTab === 'business' ? 'text-primary' : 'text-slate-400'}`}
        >
          Business Profile
          {activeTab === 'business' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('bank')}
          className={`pb-4 px-2 font-bold text-sm transition-all relative ${activeTab === 'bank' ? 'text-primary' : 'text-slate-400'}`}
        >
          Bank Accounts
          {activeTab === 'bank' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl">
        {activeTab === 'personal' && (
          <section className="bg-white  rounded-xl border border-slate-200  p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Personal Information
            </h2>
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input required className="w-full rounded-xl border-slate-200   px-4 py-3" value={personalForm.fullName} onChange={e => setPersonalForm({...personalForm, fullName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input className="w-full rounded-xl border-slate-200   px-4 py-3" value={personalForm.phone} onChange={e => setPersonalForm({...personalForm, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Identity (CCCD)</label>
                  <input className="w-full rounded-xl border-slate-200   px-4 py-3" value={personalForm.cccd} onChange={e => setPersonalForm({...personalForm, cccd: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Avatar URL</label>
                  <input className="w-full rounded-xl border-slate-200   px-4 py-3" value={personalForm.avatar} onChange={e => setPersonalForm({...personalForm, avatar: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Address</label>
                <textarea rows={2} className="w-full rounded-xl border-slate-200   px-4 py-3 shadow-inner" value={personalForm.address} onChange={e => setPersonalForm({...personalForm, address: e.target.value})} />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={saving} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  {saving ? 'Updating...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'business' && (
          <section className="bg-white  rounded-xl border border-slate-200  p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">business</span>
              Business Information
            </h2>
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Business/Legal Name</label>
                  <input required className="w-full rounded-xl border-slate-200   px-4 py-3" value={businessForm.businessName} onChange={e => setBusinessForm({...businessForm, businessName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Business Type</label>
                  <select className="w-full rounded-xl border-slate-200   px-4 py-3" value={businessForm.businessType} onChange={e => setBusinessForm({...businessForm, businessType: e.target.value})}>
                    <option value="">Select type</option>
                    <option value="Personal">Cá nhân</option>
                    <option value="Company">Công ty / Doanh nghiệp</option>
                    <option value="Chain">Chuỗi khách sạn</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Business Address</label>
                <input className="w-full rounded-xl border-slate-200   px-4 py-3" value={businessForm.address} onChange={e => setBusinessForm({...businessForm, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">About Business</label>
                <textarea rows={3} className="w-full rounded-xl border-slate-200   px-4 py-3" placeholder="Briefly describe your services..." value={businessForm.description} onChange={e => setBusinessForm({...businessForm, description: e.target.value})} />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={saving} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  {saving ? 'Updating...' : 'Save Business Changes'}
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'bank' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_balance</span>
                Payout Methods
              </h2>
              {bankAccounts.length < 3 && !showBankForm && (
                <button onClick={() => setShowBankForm(true)} className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span> Add Account
                </button>
              )}
            </div>

            {showBankForm && (
              <section className="bg-slate-50  rounded-xl border border-dashed border-primary/30 p-6">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold">Add New Bank Account</h3>
                   <button onClick={() => setShowBankForm(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                     <span className="material-symbols-outlined">close</span>
                   </button>
                </div>
                <form onSubmit={handleBankSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 uppercase tracking-wider text-slate-500">Bank Name</label>
                      <input required placeholder="e.g. Vietcombank" className="w-full rounded-lg border-slate-200   px-4 py-2" value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 uppercase tracking-wider text-slate-500">Account Number</label>
                      <input required placeholder="0123XXXXXXXX" className="w-full rounded-lg border-slate-200   px-4 py-2" value={bankForm.accountNumber} onChange={e => setBankForm({...bankForm, accountNumber: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase tracking-wider text-slate-500">Account Holder Name (NO SIGNS)</label>
                    <input required placeholder="NGUYEN VAN A" className="w-full rounded-lg border-slate-200   px-4 py-2" value={bankForm.accountHolder} onChange={e => setBankForm({...bankForm, accountHolder: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isPrimary" className="rounded text-primary focus:ring-primary h-4 w-4" checked={bankForm.isPrimary} onChange={e => setBankForm({...bankForm, isPrimary: e.target.checked})} />
                    <label htmlFor="isPrimary" className="text-sm font-medium">Set as primary payout method</label>
                  </div>
                  <button type="submit" disabled={saving} className="w-full bg-primary text-white py-3 rounded-lg font-bold">
                    {saving ? 'Saving...' : 'Confirm and Save'}
                  </button>
                </form>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankAccounts.map((acc) => (
                <div key={acc.id} className={`p-6 rounded-xl border transition-all relative ${acc.isPrimary ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200  bg-white  shadow-sm'}`}>
                  {acc.isPrimary && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Primary</div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100  flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900  leading-none mb-1">{acc.bankName}</p>
                      <p className="text-xs text-slate-500 font-medium">{acc.accountHolder}</p>
                    </div>
                  </div>
                  <p className="text-lg font-mono tracking-widest text-slate-700  mb-4">{acc.accountNumber}</p>
                  <div className="flex justify-end">
                    <button onClick={() => handleDeleteBank(acc.id)} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                  </div>
                </div>
              ))}
              
              {bankAccounts.length === 0 && !showBankForm && (
                <div className="col-span-full py-12 text-center bg-slate-50  rounded-2xl border-2 border-dashed border-slate-200 ">
                   <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">payments</span>
                   <p className="text-slate-500">No bank accounts saved. Add one to receive payouts effortlessly.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

