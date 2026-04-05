import { fetchClient } from '@/lib/api-client';
import { 
  RevenueResponse, 
  OccupancyRateResponse, 
  TopBookedRoomDto, 
  RoomRecommendationDto 
} from '@/types/api';

export const StatisticsService = {
  /**
   * Get total revenue across the entire system
   */
  async getTotalSystemRevenue() {
    return fetchClient<RevenueResponse>('/statistics/revenue', {
      method: 'GET',
    });
  },

  /**
   * Get revenue for a specific property/hotel
   */
  async getPropertyRevenue(propertyId: number) {
    return fetchClient<RevenueResponse>(`/statistics/revenue/property/${propertyId}`, {
      method: 'GET',
    });
  },

  /**
   * Get today's occupancy rate across the system
   */
  async getOccupancyRate() {
    return fetchClient<OccupancyRateResponse>('/statistics/occupancy-rate', {
      method: 'GET',
    });
  },

  /**
   * Get top 5 most booked rooms
   */
  async getTopBookedRooms() {
    return fetchClient<TopBookedRoomDto[]>('/statistics/top-booked-rooms', {
      method: 'GET',
    });
  },

  /**
   * Get suggested rooms based on rating and booking count algorithm
   */
  async getRoomRecommendations() {
    return fetchClient<RoomRecommendationDto[]>('/statistics/recommendations', {
      method: 'GET',
    });
  },

  /**
   * Get dashboard stats for the authenticated partner
   */
  async getPartnerStats() {
    return fetchClient<any>('/statistics/partner-stats', {
      method: 'GET',
    });
  }
};
