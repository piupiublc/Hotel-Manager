"use client";

import { useEffect, useState } from "react";
import { RoomService } from "@/services/room.service";
import { Room } from "@/types/api";

export default function AdminListings() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await RoomService.getAdminRooms();
      setRooms(data || []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleApprove = async (id: number) => {
    if (window.confirm("Approve this listing?")) {
      try {
        await RoomService.approveRoom(id);
        alert("Room approved successfully");
        loadRooms();
      } catch (error: any) {
        alert(error.message || "Failed to approve room.");
      }
    }
  };

  const handleHide = async (id: number) => {
    if (window.confirm("Hide this listing?")) {
      try {
        await RoomService.rejectRoom(id); // Using reject backend logic which marks isApproved=false
        alert("Room hidden successfully");
        loadRooms();
      } catch (error: any) {
        alert(error.message || "Failed to hide room.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this listing permanently?")) {
      try {
        await RoomService.deleteRoom(id);
        alert("Room deleted successfully");
        loadRooms();
      } catch (error: any) {
        // Handle both fetch-based ApiError and generic error types
        const data = error.data || error.response?.data;
        const msg = data?.message || error.message || "Failed to delete room.";
        const detail = data?.detail ? `\n\nDetail: {data.detail}` : "";
        alert(msg + detail);
      }
    }
  };

  return (
    <section className="flex-1 p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Room Listings</h1>
          <p className="text-slate-500 dark:text-slate-400">Review, approve, hide, or manage all property listings.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Room</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading rooms...</td>
                </tr>
              ) : rooms.length === 0  ? (
                <tr>
                  <td colSpan={4 } className="px-6 py-10 text-center text-slate-500">No rooms found.</td>
                </tr>
              ) : (
                rooms.map(room => (
                  <tr key={room.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                          {room.imageUrls && room.imageUrls.length > 0 ? (
                            <img src={room.imageUrls[0 ]} alt={room.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <span className="material-symbols-outlined">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{room.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{room.roomCode}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{room.propertyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.basePrice)}</p>
                      <p className="text-sm text-slate-500">Cap: {room.capacity} | Bed: {room.bedCount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {
                        room.isApproved ? 'bg-green-100 text-green-800' : 
                        room.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                         {room.isApproved ? 'Approved' : room.status === 'rejected' ? 'Hidden' : 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {(!room.isApproved || room.status === 'rejected') && (
                           <button 
                            onClick={() => handleApprove(room.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" 
                            title={room.status === 'rejected' ? "Show listing" : "Approve"}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {room.status === 'rejected' ? 'visibility' : 'check_circle'}
                            </span>
                          </button>
                        )}
                        {room.isApproved && room.status !== 'rejected' && (
                           <button 
                            onClick={() => handleHide(room.id)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors" 
                            title="Hide"
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(room.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors" 
                          title="Delete"
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
