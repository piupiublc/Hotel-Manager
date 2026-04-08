"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from "@/types/api";
import { AuthService } from "@/services/auth.service";
import { getImageUrl } from "@/lib/image-utils";


export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    fullName: "",
    phone: "",
    cccd: "",
    address: "",
    avatar: ""
  });
  const [passFormData, setPassFormData] = useState<ChangePasswordRequest>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });


  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await UserService.getProfile();
      if (data) {
        const profileData = data as any;
        // The backend might return PascalCase fields (FullName, Avatar, Phone, etc.)
        const fullName = profileData.fullName || profileData.FullName || "";
        const avatar = profileData.avatar || profileData.Avatar || "";
        const phone = profileData.phone || profileData.Phone || "";
        const cccd = profileData.cccd || profileData.CCCD || "";
        const address = profileData.address || profileData.Address || "";

        setFormData({
          fullName,
          phone,
          cccd,
          address,
          avatar
        });

        // Update auth context with normalized data
        // Only update if we have a value, to avoid wiping a working avatar from login
        updateProfile({
          fullName,
          ...(avatar ? { avatar } : {})
        });
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UserService.updateProfile(formData);
      alert("Profile updated successfully!");
      loadProfile();
    } catch (error: any) {
      alert(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passFormData.newPassword !== passFormData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await AuthService.changePassword(passFormData);
      alert("Password changed successfully!");
      setPassFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      alert(error.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20 text-slate-500">Loading your profile...</div>;
  }

  if (!user) {
    return <div className="flex justify-center p-20 flex-col items-center gap-4">
      <span className="material-symbols-outlined text-4xl text-slate-300">account_circle</span>
      <p className="text-slate-500 font-medium">Please log in to view your profile.</p>
      <a href="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-bold">Log In</a>
    </div>;
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative">
            <div className="absolute -bottom-12 left-8 h-24 w-24 bg-white rounded-full border-4 border-white overflow-hidden flex justify-center items-center font-bold text-3xl">
              {(user.avatar || (user as any).Avatar) ?
                <img src={user.avatar || (user as any).Avatar} className="w-full h-full object-cover" /> :
                (user.fullName || (user as any).FullName || "?").charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.fullName}</h1>
                <p className="text-slate-500">{user.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  user.role === 'partner' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Edit Profile Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Identity Card (CCCD)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.cccd || ''}
                  onChange={(e) => setFormData({ ...formData, cccd: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Avatar URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.avatar || ''}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                {saving ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Security & Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Current Password</label>
              <input
                required
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={passFormData.currentPassword}
                onChange={(e) => setPassFormData({ ...passFormData, currentPassword: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={passFormData.newPassword}
                  onChange={(e) => setPassFormData({ ...passFormData, newPassword: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={passFormData.confirmPassword}
                  onChange={(e) => setPassFormData({ ...passFormData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                {saving ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
