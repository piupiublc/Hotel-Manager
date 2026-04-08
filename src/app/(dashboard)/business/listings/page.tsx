"use client";

import { useEffect, useState } from "react";
import { RoomService } from "@/services/room.service";
import { PropertyService, Property } from "@/services/property.service";
import { UploadService } from "@/services/upload.service";
import { useAuth } from "@/hooks/useAuth";
import { Room, UpdateRoomRequest } from "@/types/api";
import { getImageUrl } from "@/lib/image-utils";


export default function BusinessListings() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Property Modal States
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [propertyForm, setPropertyForm] = useState<Partial<Property>>({
    name: '',
    city: '',
    district: '',
    ward: '',
    detailedAddress: '',
    type: '',
    description: ''
  });
  const [propFiles, setPropFiles] = useState<FileList | null>(null);

  // Add/Edit Room Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [roomForm, setRoomForm] = useState({ 
    name: '', 
    description: '', 
    basePrice: 0, 
    capacity: 2,  
    propertyId: 0,
    roomCode: '', 
    roomType: 'Standard', 
    bedCount: 1, 
    area: 25  
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const loadRooms = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const propData = await PropertyService.getMyProperty();
      if (propData) {
        setProperty(propData);
        setRoomForm(prev => ({ ...prev, propertyId: propData.id }));
        setPropertyForm(propData); // Sync profile form
        const data = await RoomService.getMyListings();
        setRooms(data || []);
      } else {
        setProperty(null);
        setRooms([]);
      }
    } catch (error: any) {
       if (error.status === 404 ) {
         setProperty(null);
         setRooms([]);
       } else {
         console.error("[Listings] Failed to fetch data:", error);
       }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadRooms();
  }, [user]);

  const openPropertyEdit = () => {
    if (property) {
      setPropertyForm({ ...property });
      setShowPropertyModal(true);
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedUrl = propertyForm.imageUrl || (propertyForm as any).ImageUrl;
      if (propFiles && propFiles.length > 0) {
        const data = await UploadService.uploadImage(propFiles[0]);
        uploadedUrl = data.url;
      }

      await PropertyService.updateMyProperty({
        ...propertyForm,
        imageUrl: uploadedUrl
      });
      alert("Thông tin cơ sở đã được cập nhật!");
      setShowPropertyModal(false);
      setPropFiles(null);
      loadRooms();
    } catch (error: any) {
      alert(error.message || "Cập nhật thất bại");
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setRoomForm({
      name: '', 
      description: '', 
      basePrice: 0, 
      capacity: 2,  
      propertyId: property?.id || 0,
      roomCode: `R-${Math.random().toString(36).substring(2, 7).toUpperCase()}`, 
      roomType: 'Standard', 
      bedCount: 1, 
      area: 25  
    });
    setFiles(null);
    setShowModal(true);
  };

  const openEditModal = (room: Room) => {
    setIsEditing(true);
    setCurrentRoomId(room.id);
    setRoomForm({
      name: room.name || '',
      description: room.description || '',
      basePrice: room.basePrice || 0,
      capacity: room.capacity || 2,
      propertyId: room.propertyId || property?.id || 0,
      roomCode: room.roomCode || '',
      roomType: room.roomType || 'Standard',
      bedCount: room.bedCount || 1,
      area: room.area || 25
    });
    setFiles(null);
    setShowModal(true);
  };

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedUrls: string[] = [];
      if (files && files.length > 0 ) {
        for (let i = 0 ; i < files.length; i++) {
          const data = await UploadService.uploadImage(files[i]);
          uploadedUrls.push(data.url);
        }
      }

      if (isEditing && currentRoomId) {
        const payload: UpdateRoomRequest = {
          ...roomForm,
          imageUrls: uploadedUrls.length > 0 ? uploadedUrls : undefined
        };
        await RoomService.updateRoom(currentRoomId, payload);
        alert("Room updated successfully!");
      } else {
        const payload = {
          ...roomForm,
          imageUrls: uploadedUrls
        };
        await RoomService.createRoom(payload);
        alert("Room created successfully! It requires Admin Approval.");
      }

      setShowModal(false);
      loadRooms();
    } catch (error: any) {
      alert(error.message || "Operation failed");
    }
  };

  if (!loading && !property) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-5xl">business_center</span>
        </div>
        <div className="max-w-md space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 ">Welcome, Partner!</h1>
          <p className="text-slate-500 ">
            You don't have a registered guesthouse yet. Once you set one up, you'll be able to post rooms and manage bookings.
          </p>
        </div>
        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl" onClick={() => alert("Contact admin to initialize property.")}>
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
             <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 ">
                  {property?.name ? `Manage ${property.name}` : 'Property Listings'}
                </h1>
                <button 
                   onClick={openPropertyEdit}
                   className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-primary/10 hover:text-primary flex items-center justify-center text-slate-400 transition-all shadow-sm" 
                   title="Chỉnh sửa thông tin cơ sở"
                >
                   <span className="material-symbols-outlined text-[18px]">edit_square</span>
                </button>
             </div>
            <p className="text-slate-500  text-sm font-medium">
              {property?.detailedAddress 
                ? `${property.detailedAddress}, ${property.ward}, ${property.district}, ${property.city}`
                : 'Configure your real estate portfolio, wait for approvals, and track performance'}
            </p>
          </div>

          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Tạo bài đăng mới</span>
          </button>
        </div>

        <div className="bg-white  rounded-2xl border border-slate-200  shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50  border-b border-slate-200 ">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Phòng / Ghi chú</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Trạng thái</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Giá phòng</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Sức chứa</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 ">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">Đang tải danh sách...</td>
                  </tr>
                ) : rooms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center gap-2 text-slate-400">
                          <span className="material-symbols-outlined text-5xl opacity-20">inventory_2</span>
                          <p className="font-bold">Chưa có bài đăng nào</p>
                          <button onClick={openAddModal} className="text-primary text-sm font-black border-b-2 border-primary">Tạo ngay</button>
                       </div>
                    </td>
                  </tr>
                ) : (
                  rooms.map(room => (
                    <tr key={room.id} className="hover:bg-slate-50  transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl bg-slate-200  overflow-hidden flex-shrink-0 shadow-sm border border-slate-100 ">
                            {(room.mainImageUrl || (room as any).MainImageUrl || (room.imageUrls && room.imageUrls.length > 0)) ? (
                              <img 
                                src={getImageUrl(room.mainImageUrl || (room as any).MainImageUrl || room.imageUrls?.[0]) || ""} 
                                alt={room.name} 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80";
                                }}
                              />

                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">image</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-slate-900  uppercase text-[13px] tracking-tight">{room.name || 'Unnamed Room'}</p>
                            <p className="text-[11px] text-slate-400  truncate w-48 font-bold">{room.description || 'Chưa có mô tả'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          room.isApproved ? 'bg-green-100 text-green-700 ' : 
                          room.status === 'rejected' ? 'bg-red-100 text-red-700 ' :
                          'bg-amber-100 text-amber-700 '
                        }`}>
                          {room.isApproved ? 'Hoạt động' : room.status === 'rejected' ? 'Bị từ chối' : 'Chờ duyệt'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <p className="font-black text-slate-900 ">{(room.basePrice || 0).toLocaleString('vi-VN')} <span className="text-[10px] text-slate-400">VND</span></p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mỗi đêm</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-500  text-xs">{room.capacity} Người</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 text-slate-400">
                          <button 
                            onClick={() => openEditModal(room)}
                            className="h-9 w-9 rounded-xl hover:bg-blue-50  hover:text-blue-600 flex items-center justify-center transition-all" 
                            title="Chỉnh sửa"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(room.id)}
                            className="h-9 w-9 rounded-xl hover:bg-red-50  hover:text-red-500 flex items-center justify-center transition-all" 
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
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

      {/* Property Profile Modal */}
      {showPropertyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white  p-8 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100  animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900  uppercase tracking-tighter">Cập nhật thông tin cơ sở</h3>
                 <button onClick={() => setShowPropertyModal(false)} className="h-10 w-10 rounded-2xl bg-slate-50  flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              <form onSubmit={handlePropertySubmit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Tên cơ sở kinh doanh</label>
                    <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.name || ''} onChange={e => setPropertyForm({...propertyForm, name: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Thành phố / Tỉnh</label>
                        <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.city || ''} onChange={e => setPropertyForm({...propertyForm, city: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Quận / Huyện</label>
                        <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.district || ''} onChange={e => setPropertyForm({...propertyForm, district: e.target.value})} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Phường / Xã</label>
                        <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.ward || ''} onChange={e => setPropertyForm({...propertyForm, ward: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Loại hình</label>
                        <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.type || ''} onChange={e => setPropertyForm({...propertyForm, type: e.target.value})} placeholder="Guesthouse / Hotel..." />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Địa chỉ chi tiết</label>
                    <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.detailedAddress || ''} onChange={e => setPropertyForm({...propertyForm, detailedAddress: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Mô tả giới thiệu</label>
                    <textarea rows={3} className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm" value={propertyForm.description || ''} onChange={e => setPropertyForm({...propertyForm, description: e.target.value})} placeholder="Giới thiệu đôi nét về cơ sở của bạn..." />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Ảnh đại diện cơ sở</label>
                    <input type="file" accept="image/*" className="w-full px-4 py-3 bg-slate-50  text-xs font-bold" onChange={e => setPropFiles(e.target.files)} />
                 </div>
                 <div className="flex gap-4 pt-4 border-t border-slate-100 ">
                    <button type="button" onClick={() => setShowPropertyModal(false)} className="flex-1 py-4 font-black text-[12px] uppercase tracking-widest text-slate-400">Đóng</button>
                    <button type="submit" className="flex-[2] py-4 font-black text-[12px] uppercase tracking-widest bg-primary text-white rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all">Lưu thông tin</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Reusable Modal for Add/Edit Room */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white  p-8 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100  animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900  uppercase tracking-tighter">
                     {isEditing ? 'Cập nhật bài đăng' : 'Tạo bài đăng mới'}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                     Phòng: <span className="text-primary italic">{roomForm.roomCode}</span>
                  </p>
               </div>
               <button onClick={() => setShowModal(false)} className="h-10 w-10 rounded-2xl bg-slate-50  flex items-center justify-center hover:bg-slate-100  transition-all text-slate-400">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">Tên phòng</label>
                  <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.name} onChange={e => setRoomForm({...roomForm, name: e.target.value})} placeholder="Phòng Tổng thống Riverside" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">Mã số phòng</label>
                  <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all disabled:opacity-50" value={roomForm.roomCode} onChange={e => setRoomForm({...roomForm, roomCode: e.target.value})} placeholder="RS_01" disabled={isEditing} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">Mô tả chi tiết</label>
                <textarea className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.description} onChange={e => setRoomForm({...roomForm, description: e.target.value})} placeholder="Không gian rộng rãi với tầm nhìn sông tuyệt đẹp..." rows={2} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">Hình ảnh mới (Tải lên để thay đổi)</label>
                <input type="file" multiple accept="image/*" className="w-full px-4 py-3 bg-white  border-2 border-dashed border-slate-200  rounded-2xl text-xs font-bold text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-primary file:text-white" onChange={e => setFiles(e.target.files)} />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Loại phòng</label>
                  <input required className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.roomType} onChange={e => setRoomForm({...roomForm, roomType: e.target.value})} placeholder="Deluxe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Số giường</label>
                  <input required type="number" className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.bedCount} onChange={e => setRoomForm({...roomForm, bedCount: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Diện tích (m²)</label>
                  <input required type="number" className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.area} onChange={e => setRoomForm({...roomForm, area: Number(e.target.value)})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pb-4">
                <div className="space-y-2 flex-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Giá gốc (VND/đêm)</label>
                  <input required type="number" className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.basePrice} onChange={e => setRoomForm({...roomForm, basePrice: Number(e.target.value)})} />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Số người tối đa</label>
                  <input required type="number" className="w-full px-4 py-3 bg-slate-50  border-none rounded-2xl font-bold focus:ring-2 ring-primary text-sm transition-all" value={roomForm.capacity} onChange={e => setRoomForm({...roomForm, capacity: Number(e.target.value)})} />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 ">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-[12px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Hủy bỏ</button>
                <button type="submit" className="flex-[2] py-4 font-black text-[12px] uppercase tracking-widest bg-primary text-white rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all">
                  {isEditing ? 'Lưu thay đổi' : 'Tạo bài đăng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


