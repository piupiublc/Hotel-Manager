import { fetchClient } from '@/lib/api-client';
import { Room, CreateRoomRequest, UpdateRoomRequest } from '@/types/api';

export const RoomService = {
  /**
   * Get all available rooms
   */
  async getAllRooms() {
    return fetchClient<Room[]>('/rooms', {
      method: 'GET',
    });
  },

  /**
   * Get single room details
   */
  async getRoomById(id: number) {
    return fetchClient<Room>(`/rooms/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Create a new room (Requires Admin/Partner role)
   */
  async createRoom(data: CreateRoomRequest) {
    return fetchClient<Room>('/rooms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update an existing room (Requires Admin/Partner role)
   */
  async updateRoom(id: number, data: UpdateRoomRequest) {
    return fetchClient<Room>(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a room (Requires Admin/Partner role)
   */
  async deleteRoom(id: number) {
    return fetchClient<{ message: string }>(`/rooms/${id}`, {
      method: 'DELETE',
    });
  },

  async getAdminRooms() {
    return fetchClient<Room[]>('/rooms/admin', {
      method: 'GET',
    });
  },

  async getMyListings() {
    return fetchClient<Room[]>('/rooms/my-listings', {
      method: 'GET',
    });
  },

  async approveRoom(id: number) {
    return fetchClient<{ message: string }>(`/rooms/${id}/approve`, {
      method: 'PUT',
    });
  },

  async rejectRoom(id: number) {
    return fetchClient<{ message: string }>(`/rooms/${id}/reject`, {
      method: 'PUT',
    });
  }
};
