"use client";

import { useEffect, useState } from "react";
import { RoomService } from "@/services/room.service";
import { PropertyService, Property } from "@/services/property.service";
import { useAuth } from "@/hooks/useAuth";
import { Room } from "@/types/api";

export default function BusinessListings() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ 
    name: '', 
    description: '', 
    basePrice: 0, 
    capacity: 2,  
    propertyId: 0,  // Will be set from fetched property
    roomCode: '', 
    roomType: 'Standard', 
    bedCount: 1, 
    area: 25  
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const loadRooms = async () => {
    if (!user) {
      console.log("[Listings] No user found, skipping loadRooms");
      return;
    }
    
    setLoading(true);
    try {
      console.log(`[Listings] Fetching rooms for PartnerId: {user.id}...`);
      const propData = await PropertyService.getMyProperty();
      
      if (propData) {
        console.log(`[Listings] My Property: {propData.name} (ID: {propData.id})`);
        setProperty(propData);
        setNewRoom(prev => ({ 
          ...prev, 
          propertyId: propData.id,
          roomCode: `R-{Math.random().toString(36).substring(2, 7).toUpperCase()}`
        }));
        
        const data = await RoomService.getMyListings();
        console.log(`[Listings] Found {data.length} rooms (via MyListings)`);
        setRooms(data || []);
      } else {
        console.warn("[Listings] User has no Property registered");
        setProperty(null);
        setRooms([]);
      }
    } catch (error: any) {
       if (error.status === 404 ) {
         setProperty(null);
         setRooms([]);
       } else {
         console.error("[Listings] Failed to fetch business data:", error);
       }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user) loadRooms();
  }, [user]);


  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await RoomService.deleteRoom(id);
        alert("Room deleted successfully");
        loadRooms(); 
      } catch (error: any) {
        alert(error.message || "Failed to delete room");
      }
    }
  };

  const handeAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedUrls: string[] = [];

      if (files && files.length > 0 ) {
        for (let i = 0 ; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          
          // Must fetch directly without Content-Type so boundary is set automatically
          const token = localStorage.getItem('access_token');
          const res = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
            headers: token ? { 'Authorization': `Bearer {token}` } : {}
          });

          if (res.ok) {
            const data = await res.json();
            uploadedUrls.push(data.url);
          }
        }
      }

      const payload = {
        ...newRoom,
        imageUrls: uploadedUrls
      };
      
      await RoomService.createRoom(payload);
      alert("Room created successfully! It requires Admin Approval before becoming public.");
      setShowAddModal(false);
      setFiles(null);
      loadRooms();
    } catch (error: any) {
      alert(error.message || "Failed to create room");
    }
  };

  if (!loading && !property) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-5xl">business_center</span>
        </div>
        <div className="max-w-md space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome, Partner!</h1>
          <p className="text-slate-500 dark:text-slate-400">
            You don't have a registered guesthouse yet. Once you set one up, you'll be able to post rooms and manage bookings.
          </p>
        </div>
        <button 
          onClick={async () => {
             // In a real app, this would open a 'Setup Business' modal.
             // For now, let's assume registration auto-creates one.
             // If they are here, it's a legacy account.
             alert("Please contact admin to initialize your business property (legacy account support).");
          }}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          Initialize My Business
        </button>
      </div>
    );
  }

  return (

    <>
      <section className="flex-1 p-4 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1  className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {property?.name ? `Manage {property.name}` : 'Property Listings'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {property?.detailedAddress 
                ? `{property.detailedAddress}, {property.ward}, {property.district}, {property.city}`
                : 'Configure your real estate portfolio, wait for approvals, and track performance'}
            </p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Create New Listing</span>
          </button>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 overflow-x-auto">
          <a className="pb-3 border-b-2 border-primary text-primary font-bold whitespace-nowrap" href="#">All Listings ({rooms.length})</a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">ID / Room</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Price / Night</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Capacity</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={5 } className="px-6 py-10 text-center text-slate-500">Loading rooms...</td>
                  </tr>
                ) : rooms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">No rooms found. Click Create New Listing above.</td>
                  </tr>
                ) : (
                  rooms.map(room => (
                    <tr key={room.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                            {room.imageUrls && room.imageUrls.length > 0  ? (
                              <img src={room.imageUrls[0]} alt={room.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">image</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">{room.name || 'Unnamed Room'}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-48">{room.description || 'No description'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {
                          room.isApproved ? 'bg-green-100 text-green-800' : 
                          room.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {room.isApproved ? 'PUBLIC' : room.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-slate-100">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.basePrice)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-600 dark:text-slate-400">{room.capacity} Pax</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
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

      {/* Inline Modal for creating a Room */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Add New Room</h3>
            <form onSubmit={handeAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Room Name</label>
                  <input required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.name} onChange={e => setNewRoom({...newRoom, name: e.target.value})} placeholder="Ocean View Suite" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Room Code</label>
                  <input required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.roomCode} onChange={e => setNewRoom({...newRoom, roomCode: e.target.value})} placeholder="ROOM_001" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold mb-1 block">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} placeholder="Beautiful seaside view..." rows={3} />
              </div>

              <div>
                <label className="text-sm font-semibold mb-1 block text-slate-700">Room Images</label>
                <input type="file" multiple accept="image/*" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" onChange={e => setFiles(e.target.files)} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Room Type</label>
                  <input required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.roomType || ''} onChange={e => setNewRoom({...newRoom, roomType: e.target.value})} placeholder="Standard" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 block">Bed Count</label>
                  <input required type="number" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.bedCount || ''} onChange={e => setNewRoom({...newRoom, bedCount: Number(e.target.value)})} placeholder="1" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 block">Area (m²)</label>
                  <input required type="number" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.area || ''} onChange={e => setNewRoom({...newRoom, area: Number(e.target.value)})} placeholder="25" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Price (Per Night)</label>
                  <input required type="number" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.basePrice || ''} onChange={e => setNewRoom({...newRoom, basePrice: Number(e.target.value)})} placeholder="0" />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-semibold text-slate-700 block">Capacity</label>
                  <input required type="number" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" value={newRoom.capacity || ''} onChange={e => setNewRoom({...newRoom, capacity: Number(e.target.value)})} placeholder="2" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 font-semibold text-slate-500">Cancel</button>
                <button type="submit" className="px-4 py-2 font-bold bg-primary text-white rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
