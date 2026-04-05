import { fetchClient } from "@/lib/api-client";

export const PartnerService = {
  getPartnerProfile: async () => {
    return fetchClient("/partner/profile");
  },

  updatePartnerProfile: async (data: {
    businessName: string;
    businessType: string;
    address: string;
    description: string;
  }) => {
    return fetchClient("/partner/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getBankAccounts: async () => {
    return fetchClient("/partner/bank-accounts");
  },

  saveBankAccount: async (data: {
    id?: number;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    isPrimary: boolean;
  }) => {
    return fetchClient("/partner/bank-accounts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  deleteBankAccount: async (id: number) => {
    return fetchClient(`/partner/bank-accounts/${id}`, {
      method: "DELETE",
    });
  },
};
