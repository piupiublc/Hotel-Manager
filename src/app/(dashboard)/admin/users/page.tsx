"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";
import { UserProfile } from "@/types/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getAllUsers();
      setUsers(data as unknown as UserProfile[] || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(id);
        alert("User deleted successfully");
        loadUsers();
      } catch (error: any) {
        alert(error.message || "Failed to delete user. You cannot delete the currently logged in account.");
      }
    }
  };

  return (
    <section className="flex-1 p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 ">User Management</h1>
          <p className="text-slate-500 ">View and manage all registered customers and partners.</p>
        </div>
      </div>

      <div className="bg-white  rounded-xl border border-slate-200  shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50  border-b border-slate-200 ">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ">ID / Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ">Email & Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ">Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500  text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 ">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50  transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-200  flex items-center justify-center text-xl font-bold border border-slate-200  overflow-hidden">
                          {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 ">{user.fullName}</p>
                          <p className="text-xs text-slate-500 ">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 ">{user.email}</p>
                      <p className="text-sm text-slate-500">{user.phone || 'No phone'} | {user.cccd || 'No CCCD'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'partner' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 ">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete User"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

