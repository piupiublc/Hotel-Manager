import { fetchClient } from "@/lib/api-client";

export interface Property {
  id: number;
  partnerId: number;
  name: string;
  type: string;
  city: string;
  district: string;
  ward: string;
  detailedAddress: string;
  description?: string;
  status: string;
}

export const PropertyService = {
  async getMyProperty() {
    return await fetchClient<Property>('/properties/my');
  },
  async getPartnerProperties() {
    return await fetchClient<Property[]>('/properties/partner');
  }
};
