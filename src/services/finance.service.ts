import { fetchClient } from '@/lib/api-client';
import { BusinessFinanceSummary, AdminFinanceSummary } from '@/types/api';

export const FinanceService = {
  /**
   * Get financial summary for the currently authenticated partner
   */
  async getBusinessSummary() {
    return fetchClient<BusinessFinanceSummary>('/finance/business', {
      method: 'GET',
    });
  },

  /**
   * Get system-wide financial summary (Admin only)
   */
  async getAdminSummary() {
    return fetchClient<AdminFinanceSummary>('/finance/admin', {
      method: 'GET',
    });
  },

  async createPayoutRequest(data: any) {
    return fetchClient<any>('/finance/payout/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMyPayouts() {
    return fetchClient<any[]>('/finance/payout/my-payouts', {
      method: 'GET',
    });
  },

  async getAllPayouts() {
    return fetchClient<any[]>('/finance/payout/all', {
      method: 'GET',
    });
  },

  async processPayout(id: number, data: any) {
    return fetchClient<any>(`/finance/payout/${id}/process`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};
