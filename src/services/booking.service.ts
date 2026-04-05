import { fetchClient } from '@/lib/api-client';
import { Booking, CreateBookingRequest } from '@/types/api';

export const BookingService = {
  /**
   * Create a new booking
   */
  async createBooking(data: CreateBookingRequest) {
    return fetchClient<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Get bookings for the currently authenticated user
   */
  async getMyBookings() {
    return fetchClient<Booking[]>('/bookings/my', {
      method: 'GET',
    });
  },

  /**
   * Get all bookings across the system (Admin only)
   */
  async getAllBookings() {
    return fetchClient<Booking[]>('/bookings', {
      method: 'GET',
    });
  },

  /**
   * Confirm a booking (Admin only)
   */
  async confirmBooking(id: number) {
    return fetchClient<Booking>(`/bookings/${id}/confirm`, {
      method: 'PUT',
    });
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(id: number) {
    return fetchClient<Booking>(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  },

  /**
   * Get occupancy rates for a specific period (Admin only)
   * Dates should be formatted as YYYY-MM-DD
   */
  async getOccupancyRates(from: string, to: string) {
    return fetchClient<any>(`/bookings/occupancy?from=${from}&to=${to}`, {
      method: 'GET',
    });
  },

  /**
   * Get bookings for a partner
   */
  async getPartnerBookings() {
    return fetchClient<any[]>('/bookings/partner', {
      method: 'GET',
    });
  },

  /**
   * Check in a booking
   */
  async checkIn(id: number) {
    return fetchClient<any>(`/bookings/${id}/checkin`, {
      method: 'PUT',
    });
  },

  /**
   * Complete (checkout) a booking
   */
  async complete(id: number) {
    return fetchClient<any>(`/bookings/${id}/complete`, {
      method: 'PUT',
    });
  }
};
